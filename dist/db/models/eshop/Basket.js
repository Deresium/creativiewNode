"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../../pgConnexion");
const ProductBasket_1 = __importDefault(require("./ProductBasket"));
class Basket extends sequelize_1.Model {
    get basketId() {
        return this.id;
    }
    get basketProductsBasket() {
        return this.productsBasket;
    }
    get basketBilling() {
        return this.bill;
    }
    set basketBilling(bill) {
        this.bill = bill;
    }
}
exports.default = Basket;
Basket.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    state: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    externalRef: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: true
    },
    bill: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: true
    }
}, {
    tableName: 'Baskets',
    sequelize: pgConnexion_1.sequelize
});
Basket.hasMany(ProductBasket_1.default, { sourceKey: "id", foreignKey: "basketId", as: "productsBasket" });
//# sourceMappingURL=Basket.js.map