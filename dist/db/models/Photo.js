"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../pgConnexion");
const Gallery_1 = __importDefault(require("./Gallery"));
class Photo extends sequelize_1.Model {
}
exports.default = Photo;
Photo.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    type: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    picture: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false
    },
    galleryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Photos',
    sequelize: pgConnexion_1.sequelize
});
Gallery_1.default.hasMany(Photo, { sourceKey: "id", foreignKey: "galleryId", as: "photos" });
Photo.belongsTo(Gallery_1.default, { foreignKey: "galleryId", targetKey: "id" });
//# sourceMappingURL=Photo.js.map