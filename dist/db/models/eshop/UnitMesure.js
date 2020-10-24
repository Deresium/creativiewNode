"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../../pgConnexion");
class UnitMesure extends sequelize_1.Model {
}
exports.default = UnitMesure;
UnitMesure.init({
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
    unitMesureCat: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Unitmesures',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=UnitMesure.js.map