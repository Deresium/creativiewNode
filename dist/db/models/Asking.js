"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../pgConnexion");
const Photo_1 = __importDefault(require("./Photo"));
class Asking extends sequelize_1.Model {
}
exports.default = Asking;
Asking.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    photoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    clientId: {
        type: new sequelize_1.DataTypes.STRING(256)
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT
    },
    paymentState: {
        type: new sequelize_1.DataTypes.STRING(256)
    }
}, {
    tableName: 'Askings',
    sequelize: pgConnexion_1.sequelize
});
Asking.belongsTo(Photo_1.default, { targetKey: "id", foreignKey: "photoId", as: "photo" });
