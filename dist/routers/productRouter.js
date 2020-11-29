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
const multer_1 = __importDefault(require("multer"));
const authentication_1 = require("../middlewares/authentication");
const pgConnexion_1 = require("../pgConnexion");
const Product_1 = __importDefault(require("../db/models/eshop/Product"));
const Picture_1 = __importDefault(require("../db/models/eshop/Picture"));
const Price_1 = __importDefault(require("../db/models/eshop/Price"));
const ProductController_1 = require("../db/controllers/ProductController");
const productRouter = express_1.default.Router();
const upload = multer_1.default();
productRouter.post('/product', authentication_1.auth, authentication_1.authOnlyOwner, upload.array('picture'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pgConnexion_1.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            const name = req.body.name;
            const description = req.body.description;
            const code = req.body.code;
            const reference = req.body.reference;
            const prices = JSON.parse(req.body.prices);
            const vat = req.body.vat;
            const files = req.files;
            const createdProduct = yield Product_1.default.create({
                name,
                description,
                vat,
                code,
                reference
            }, { transaction: t });
            for (const file of files) {
                yield Picture_1.default.create({
                    name: file.originalname,
                    format: file.mimetype,
                    picture: file.buffer,
                    productId: createdProduct.productId
                }, { transaction: t });
            }
            for (const price of prices) {
                yield Price_1.default.create({
                    productId: createdProduct.productId,
                    categoryId: price.categoryId,
                    price: price.price,
                    startDate: Date.now()
                }, { transaction: t });
            }
            res.status(200).send();
        }));
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
productRouter.put('/product/:id', authentication_1.auth, authentication_1.authOnlyOwner, upload.array('picture'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findByPk(req.params.id, { include: [{ association: Product_1.default.associations.pictures, attributes: ['id', 'name', 'format'] }, { association: Product_1.default.associations.prices, include: [{ association: Price_1.default.associations.category }] }] });
        if (product) {
            yield pgConnexion_1.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
                const name = req.body.name;
                const description = req.body.description;
                const vat = req.body.vat;
                const code = req.body.code;
                const reference = req.body.reference;
                const prices = JSON.parse(req.body.prices);
                const files = req.files;
                const existingFiles = req.body.existingPicture;
                const typedExistingFiles = new Array();
                if (existingFiles) {
                    if (typeof existingFiles === "string") {
                        typedExistingFiles.push(parseInt(existingFiles));
                    }
                    else {
                        for (const existingFile of existingFiles) {
                            typedExistingFiles.push(parseInt(existingFile));
                        }
                    }
                }
                yield product.updateProduct({
                    name,
                    description,
                    vat,
                    code,
                    reference
                }, t);
                yield product.updatePrices(prices, t);
                for (const dbFile of product.listPictures) {
                    let find = false;
                    for (const typedExistingFile of typedExistingFiles) {
                        if (dbFile.pictureId === typedExistingFile)
                            find = true;
                    }
                    if (!find)
                        yield dbFile.destroy({ transaction: t });
                }
                for (const file of files) {
                    yield Picture_1.default.create({
                        name: file.originalname,
                        format: file.mimetype,
                        picture: file.buffer,
                        productId: req.params.id
                    }, { transaction: t });
                }
                res.status(200).send();
            }));
        }
        else
            res.status(500).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
productRouter.get('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.findAll({ where: { delete: false }, order: [[Product_1.default.associations.prices, 'price']], include: [{ association: Product_1.default.associations.pictures, attributes: ['id', 'name', 'format'] }, { association: Product_1.default.associations.prices, where: { endDate: null }, include: [{ association: Price_1.default.associations.category }] }] });
        res.send(products);
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
productRouter.get('/product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductController_1.getProduct(parseInt(req.params.id));
        if (product)
            res.send(product);
        else
            res.status(404).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
productRouter.get('/product/picture/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const picture = yield Picture_1.default.findByPk(req.params.id);
        if (picture) {
            res.set('Content-Type', 'image/jpg');
            res.send(picture.pictureData);
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
productRouter.delete('/product/:id', authentication_1.auth, authentication_1.authOnlyOwner, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findByPk(req.params.id);
        if (product) {
            product.deleteProduct();
            yield product.save();
        }
        else
            res.status(404);
        res.send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Une erreur est survenue');
    }
}));
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map