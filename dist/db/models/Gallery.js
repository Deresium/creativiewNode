"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../pgConnexion");
class Gallery extends sequelize_1.Model {
}
exports.default = Gallery;
Gallery.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    descriptionFr: {
        type: new sequelize_1.DataTypes.STRING(4000),
        allowNull: false
    },
    descriptionEn: {
        type: new sequelize_1.DataTypes.STRING(4000),
        allowNull: false
    }
}, {
    tableName: 'Galleries',
    sequelize: pgConnexion_1.sequelize
});
