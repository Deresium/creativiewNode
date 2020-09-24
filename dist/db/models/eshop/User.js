"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../../pgConnexion");
const Role_1 = __importDefault(require("./Role"));
const roles_1 = __importDefault(require("../../../enums/roles"));
class User extends sequelize_1.Model {
    get userId() {
        return this.id;
    }
    get userPassword() {
        return this.password;
    }
    get userSalted() {
        return this.salted;
    }
    get userRole() {
        return this.roleCode;
    }
}
exports.default = User;
User.init({
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
    password: {
        type: new sequelize_1.DataTypes.STRING(1024)
    },
    salted: {
        type: new sequelize_1.DataTypes.STRING(1024)
    },
    googleId: {
        type: new sequelize_1.DataTypes.STRING(1024)
    },
    roleCode: {
        type: new sequelize_1.DataTypes.STRING(10),
        defaultValue: roles_1.default.USER
    }
}, {
    tableName: 'Users',
    sequelize: pgConnexion_1.sequelize
});
User.belongsTo(Role_1.default, { foreignKey: 'roleCode', targetKey: 'code' });
//# sourceMappingURL=User.js.map