"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../../pgConnexion");
class SubCategory extends sequelize_1.Model {
}
exports.default = SubCategory;
SubCategory.init({
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
        type: new sequelize_1.DataTypes.STRING(16),
        allowNull: false
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Subcategories',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=SubCategory.js.map