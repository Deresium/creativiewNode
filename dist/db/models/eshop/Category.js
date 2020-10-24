"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../../pgConnexion");
class Category extends sequelize_1.Model {
}
exports.default = Category;
Category.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    abbreviation: {
        type: new sequelize_1.DataTypes.STRING(64),
        allowNull: false
    }
}, {
    tableName: 'Categories',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=Category.js.map