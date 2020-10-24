"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../../pgConnexion");
class Picture extends sequelize_1.Model {
    get pictureData() {
        return this.picture;
    }
    get pictureId() {
        return this.id;
    }
}
exports.default = Picture;
Picture.init({
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    format: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    picture: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Pictures',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=Picture.js.map