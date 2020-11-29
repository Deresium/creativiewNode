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
exports.getSeparateTotalBasket = exports.getTotalBasket = exports.findCurrentBasket = void 0;
const Basket_1 = __importDefault(require("../models/eshop/Basket"));
const PriceController_1 = require("./PriceController");
const Product_1 = __importDefault(require("../models/eshop/Product"));
const findCurrentBasket = (userId, externalRef) => __awaiter(void 0, void 0, void 0, function* () {
    let basket;
    if (userId) {
        basket = yield Basket_1.default.findOne({
            where: { userId, state: 'BASKET' },
            include: [{ association: Basket_1.default.associations.productsBasket }]
        });
    }
    else {
        if (externalRef) {
            basket = yield Basket_1.default.findOne({
                where: { externalRef, state: 'BASKET' },
                include: [{ association: Basket_1.default.associations.productsBasket }]
            });
        }
    }
    return basket;
});
exports.findCurrentBasket = findCurrentBasket;
const getTotalBasket = (userId, externalRef) => __awaiter(void 0, void 0, void 0, function* () {
    const basket = yield findCurrentBasket(userId, externalRef);
    if (!basket)
        return '0';
    let total = 0;
    for (const productBasket of basket.basketProductsBasket) {
        const product = yield Product_1.default.findByPk(productBasket.pbProductId);
        const price = yield PriceController_1.getPriceOnCategoryIdAndProductId(productBasket.pbCategoryId, productBasket.pbProductId);
        total += (productBasket.productBasketQuantity * (price.pricePrice * (1 + product.productVat / 100)));
    }
    return total.toFixed(2);
});
exports.getTotalBasket = getTotalBasket;
const getSeparateTotalBasket = (userId, externalRef) => __awaiter(void 0, void 0, void 0, function* () {
    let totals = new Map();
    const basket = yield findCurrentBasket(userId, externalRef);
    if (!basket) {
        return {
            total: 0,
            totals
        };
    }
    let total = 0;
    for (const productBasket of basket.basketProductsBasket) {
        const product = yield Product_1.default.findByPk(productBasket.pbProductId);
        const price = yield PriceController_1.getPriceOnCategoryIdAndProductId(productBasket.pbCategoryId, productBasket.pbProductId);
        const existingVat = totals.get(product.productVat);
        const priceHTVA = productBasket.productBasketQuantity * price.pricePrice;
        const priceTVAC = productBasket.productBasketQuantity * (price.pricePrice * (1 + product.productVat / 100));
        total += (productBasket.productBasketQuantity * (price.pricePrice * (1 + product.productVat / 100)));
        if (existingVat) {
            existingVat[0] += priceHTVA;
            existingVat[1] += priceTVAC;
        }
        else {
            totals.set(product.productVat, [priceHTVA, priceTVAC]);
        }
    }
    return {
        total,
        totals
    };
});
exports.getSeparateTotalBasket = getSeparateTotalBasket;
//# sourceMappingURL=BasketController.js.map