"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const pdf_lib_1 = require("pdf-lib");
const fs = __importStar(require("fs"));
const ProductController_1 = require("./db/controllers/ProductController");
const PriceController_1 = require("./db/controllers/PriceController");
const Category_1 = __importDefault(require("./db/models/eshop/Category"));
const awsCalls_1 = require("./awsCalls");
const generateBilling = (basket, totals) => __awaiter(void 0, void 0, void 0, function* () {
    const path = `pdf/${basket.basketId}.pdf`;
    const pdf = yield pdf_lib_1.PDFDocument.create();
    const logoPng = yield pdf.embedPng(fs.readFileSync('./public/images/logo.png'));
    const pngDims = logoPng.scale(0.25);
    let page = pdf.addPage();
    const { width, height } = page.getSize();
    page.drawText(`Facture Eshop Creatiview N°${basket.basketId}`, {
        size: 20,
        x: 50,
        y: height - 50
    });
    const dayDate = new Date();
    page.drawText(`date: ${dayDate.getDate()}/${dayDate.getMonth() + 1}/${dayDate.getFullYear()}`, {
        size: 13,
        x: 50,
        y: height - 70
    });
    page.drawImage(logoPng, {
        x: width - 1.5 * pngDims.width,
        y: height - 1.5 * pngDims.height,
        width: pngDims.width,
        height: pngDims.height
    });
    let y = height - 150;
    for (const productBasket of basket.basketProductsBasket) {
        console.log('QUANTITY', productBasket.productBasketQuantity);
        if (y < 120) {
            page = pdf.addPage();
            y = height - 50;
        }
        const product = yield ProductController_1.getProduct(productBasket.pbProductId);
        const price = yield PriceController_1.getPriceOnCategoryIdAndProductId(productBasket.pbCategoryId, productBasket.pbProductId);
        const category = yield Category_1.default.findByPk(productBasket.pbCategoryId);
        page.drawText(`${product.productName} (${category.categoryName})`, {
            size: 13,
            x: 50,
            y
        });
        y -= 20;
        page.drawText(`Prix unitaire: ${(price.pricePrice * (1 + product.productVat / 100)).toFixed(2)}€`, {
            size: 13,
            x: 50,
            y
        });
        y -= 20;
        page.drawText(`Quantité: ${productBasket.productBasketQuantity}`, {
            size: 13,
            x: 50,
            y
        });
        y -= 50;
    }
    totals.totals.forEach((value, key) => {
        if (y < 100) {
            page = pdf.addPage();
            y = height - 50;
        }
        page.drawText(`TVA ${key.toString()}%`, {
            size: 13,
            x: 50,
            y
        });
        page.drawText(`HTVA: ${value[0].toFixed(2)}€`, {
            size: 13,
            x: 250,
            y
        });
        page.drawText(`TVAC: ${value[1].toFixed(2)}€`, {
            size: 13,
            x: 450,
            y
        });
        y -= 20;
    });
    if (y < 50) {
        page = pdf.addPage();
        y = height - 50;
    }
    page.drawText(`TOTAL: ${totals.total.toFixed(2)}€`, {
        size: 17,
        x: 50,
        y
    });
    const pdfBytes = yield pdf.save();
    const buffer = new Buffer(pdfBytes);
    yield awsCalls_1.sendToAWS(buffer, basket.basketId);
    return pdfBytes;
});
exports.default = generateBilling;
//# sourceMappingURL=generateBilling.js.map