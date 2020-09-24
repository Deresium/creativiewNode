"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../../pgConnexion");
class Role extends sequelize_1.Model {
}
exports.default = Role;
Role.init({
    code: {
        type: new sequelize_1.DataTypes.STRING(10),
        primaryKey: true
    },
    wording: {
        type: new sequelize_1.DataTypes.STRING(64),
        allowNull: false
    }
}, {
    tableName: 'Roles',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=Role.js.map