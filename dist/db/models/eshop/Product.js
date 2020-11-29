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
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../../pgConnexion");
const Picture_1 = __importDefault(require("./Picture"));
const Price_1 = __importDefault(require("./Price"));
class Product extends sequelize_1.Model {
    get productId() {
        return this.id;
    }
    get productName() {
        return this.name;
    }
    deleteProduct() {
        this.deleteDate = new Date();
        this.delete = true;
    }
    updateProduct(product, t) {
        return __awaiter(this, void 0, void 0, function* () {
            this.name = product.name;
            this.code = product.code;
            this.vat = product.vat;
            this.reference = product.reference;
            this.description = product.description;
            yield this.save({ transaction: t });
        });
    }
    updatePrices(prices, t) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const price of this.prices) {
                yield price.endPrice(t);
            }
            for (const price of prices) {
                yield Price_1.default.create({
                    productId: this.id,
                    categoryId: price.categoryId,
                    price: price.price,
                    startDate: Date.now()
                }, { transaction: t });
            }
        });
    }
    get listPictures() {
        return this.pictures;
    }
    get productVat() {
        return this.vat;
    }
}
exports.default = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: true
    },
    reference: {
        type: new sequelize_1.DataTypes.STRING(512),
        allowNull: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    description: {
        type: new sequelize_1.DataTypes.STRING(4000),
        allowNull: true
    },
    delete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    deleteDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    vat: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 21
    }
}, {
    tableName: 'Products',
    sequelize: pgConnexion_1.sequelize
});
Product.hasMany(Picture_1.default, { sourceKey: "id", foreignKey: "productId", as: "pictures" });
Product.hasMany(Price_1.default, { sourceKey: "id", foreignKey: "productId", as: "prices" });
//# sourceMappingURL=Product.js.map