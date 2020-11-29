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
const Category_1 = __importDefault(require("./Category"));
class Price extends sequelize_1.Model {
    endPrice(t) {
        return __awaiter(this, void 0, void 0, function* () {
            this.endDate = new Date();
            yield this.save({ transaction: t });
        });
    }
    get pricePrice() {
        return this.price;
    }
    get priceId() {
        return this.id;
    }
}
exports.default = Price;
Price.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Prices',
    sequelize: pgConnexion_1.sequelize
});
Price.belongsTo(Category_1.default, { foreignKey: "categoryId", targetKey: "id", as: "category" });
//# sourceMappingURL=Price.js.map