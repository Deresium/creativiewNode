"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../../pgConnexion");
class UnitMesureCat extends sequelize_1.Model {
}
exports.default = UnitMesureCat;
UnitMesureCat.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    }
}, {
    tableName: 'Unitmesurecats',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=UnitMesureCat.js.map