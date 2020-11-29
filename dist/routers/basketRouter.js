"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Basket_1 = __importDefault(require("../db/models/eshop/Basket"));
const cookie_1 = __importDefault(require("cookie"));
const authentication_1 = require("../middlewares/authentication");
const cookies_1 = require("../cookies");
const uuid_1 = require("uuid");
const ProductBasket_1 = __importDefault(require("../db/models/eshop/ProductBasket"));
const pgConnexion_1 = require("../pgConnexion");
const generateBilling_1 = __importDefault(require("../generateBilling"));
const BasketController_1 = require("../db/controllers/BasketController");
const PriceController_1 = require("../db/controllers/PriceController");
const awsCalls_1 = require("../awsCalls");
const basketRouter = express_1.default.Router();
basketRouter.post('/addToBasket', authentication_1.retrieveUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield pgConnexion_1.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.userId;
        let basket;
        if (userId) {
            basket = yield Basket_1.default.findOne({ where: { userId, state: 'BASKET' }, include: [{ association: Basket_1.default.associations.productsBasket }] });
            if (!basket) {
                basket = yield Basket_1.default.create({
                    userId: userId,
                    state: 'BASKET'
                }, { transaction: t });
            }
        }
        else {
            const cookies = cookie_1.default.parse(req.headers.cookie || '');
            const externalRef = cookies.externalRefBasket;
            if (externalRef)
                basket = yield Basket_1.default.findOne({ where: { externalRef, state: 'BASKET' }, include: [{ association: Basket_1.default.associations.productsBasket }] });
            else {
                const uuid = uuid_1.v4();
                basket = yield Basket_1.default.create({
                    externalRef: uuid,
                    state: 'BASKET'
                }, { transaction: t });
                res.setHeader('Set-Cookie', cookies_1.getExternalRefBasketCookie(uuid));
            }
        }
        if (!basket) {
            res.status(500).send();
            return;
        }
        const productId = req.body.productId;
        const categoryId = req.body.categoryId;
        const quantity = req.body.quantity;
        if (!productId || !categoryId) {
            res.status(404).send();
            return;
        }
        let foundProduct = false;
        if (basket.basketProductsBasket) {
            for (let i = 0; i < basket.basketProductsBasket.length && !foundProduct; ++i) {
                const basketProduct = basket.basketProductsBasket[i];
                if (basketProduct.pbCategoryId === categoryId && basketProduct.pbProductId === productId) {
                    basketProduct.productBasketQuantity = basketProduct.productBasketQuantity + quantity;
                    yield basketProduct.save({ transaction: t });
                    foundProduct = true;
                }
            }
        }
        if (!foundProduct) {
            yield ProductBasket_1.default.create({
                basketId: basket.basketId,
                categoryId,
                productId,
                quantity
            }, { transaction: t });
        }
        res.send();
    }));
}));
basketRouter.get('/basket', authentication_1.retrieveUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const cookies = cookie_1.default.parse(req.headers.cookie || '');
    const externalRef = cookies.externalRefBasket;
    const basket = yield BasketController_1.findCurrentBasket(userId, externalRef);
    if (!basket) {
        res.status(404).send();
    }
    else {
        res.send(basket);
    }
}));
basketRouter.put('/productBasket', authentication_1.retrieveUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const cookies = cookie_1.default.parse(req.headers.cookie || '');
    const externalRef = cookies.externalRefBasket;
    const basket = yield BasketController_1.findCurrentBasket(userId, externalRef);
    if (!basket) {
        res.status(404).send();
        return;
    }
    if (!req.body.productBasketId || !req.body.quantity) {
        res.status(400).send();
        return;
    }
    let updated = false;
    for (let i = 0; i < basket.basketProductsBasket.length && !updated; ++i) {
        const productBasket = basket.basketProductsBasket[i];
        if (productBasket.productBasketId === req.body.productBasketId) {
            productBasket.productBasketQuantity = req.body.quantity;
            yield productBasket.save();
            updated = true;
        }
    }
    if (updated)
        res.send();
    else
        res.status(400).send();
}));
basketRouter.delete('/productBasket/:id', authentication_1.retrieveUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const cookies = cookie_1.default.parse(req.headers.cookie || '');
    const externalRef = cookies.externalRefBasket;
    const basket = yield BasketController_1.findCurrentBasket(userId, externalRef);
    if (!basket) {
        res.status(404).send();
        return;
    }
    if (!req.params.id) {
        res.status(400).send();
        return;
    }
    const id = parseInt(req.params.id);
    let deleted = false;
    for (let i = 0; i < basket.basketProductsBasket.length && !deleted; ++i) {
        const productBasket = basket.basketProductsBasket[i];
        if (productBasket.productBasketId === id) {
            yield productBasket.destroy();
            deleted = true;
        }
    }
    if (deleted)
        res.send();
    else {
        res.status(400).send();
    }
}));
basketRouter.post('/order', authentication_1.retrieveUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield pgConnexion_1.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.userId;
        const cookies = cookie_1.default.parse(req.headers.cookie || '');
        const externalRef = cookies.externalRefBasket;
        const basket = yield BasketController_1.findCurrentBasket(userId, externalRef);
        if (!basket) {
            res.status(404).send();
            return;
        }
        const mapBasketProductFromReq = new Map();
        for (const basketProduct of req.body) {
            mapBasketProductFromReq.set(basketProduct.id, basketProduct);
        }
        for (let i = 0; i < basket.basketProductsBasket.length; ++i) {
            const productBasketFromDb = basket.basketProductsBasket[i];
            if (mapBasketProductFromReq.has(productBasketFromDb.productBasketId)) {
                productBasketFromDb.productBasketQuantity = mapBasketProductFromReq.get(productBasketFromDb.productBasketId).quantity;
                const price = yield PriceController_1.getPriceOnCategoryIdAndProductId(productBasketFromDb.pbCategoryId, productBasketFromDb.pbProductId);
                productBasketFromDb.pbPriceId = price.priceId;
                yield productBasketFromDb.save({ transaction: t });
            }
            else {
                yield productBasketFromDb.destroy({ transaction: t });
            }
        }
        yield generateBilling_1.default(basket, yield BasketController_1.getSeparateTotalBasket(userId, externalRef));
        res.send(basket.basketId.toString());
    }));
}));
basketRouter.get('/basketBilling/:idBasket', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const basket = yield Basket_1.default.findByPk(req.params.idBasket);
    if (!req.params.idBasket) {
        res.status(400).send();
        return;
    }
    const file = yield awsCalls_1.getFromAWS(parseInt(req.params.idBasket));
    if (!file) {
        res.status(404).send();
        return;
    }
    console.log('FILE', file);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(file);
}));
basketRouter.get('/totalBasket', authentication_1.retrieveUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const cookies = cookie_1.default.parse(req.headers.cookie || '');
    const externalRef = cookies.externalRefBasket;
    const total = yield BasketController_1.getTotalBasket(userId, externalRef);
    res.send(total.toString());
}));
exports.default = basketRouter;
//# sourceMappingURL=basketRouter.js.map