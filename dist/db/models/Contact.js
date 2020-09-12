"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../pgConnexion");
class Contact extends sequelize_1.Model {
}
exports.default = Contact;
Contact.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    firstName: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    message: {
        type: new sequelize_1.DataTypes.STRING(4000),
        allowNull: false
    }
}, {
    tableName: 'Contacts',
    sequelize: pgConnexion_1.sequelize
});
