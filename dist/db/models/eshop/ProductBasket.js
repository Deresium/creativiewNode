"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../../../pgConnexion");
class ProductBasket extends sequelize_1.Model {
    get productBasketId() {
        return this.id;
    }
    get productBasketQuantity() {
        return this.quantity;
    }
    set productBasketQuantity(quantity) {
        this.quantity = quantity;
    }
    get pbCategoryId() {
        return this.categoryId;
    }
    get pbProductId() {
        return this.productId;
    }
    set pbPriceId(priceId) {
        this.priceId = priceId;
    }
}
exports.default = ProductBasket;
ProductBasket.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    basketId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    priceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'ProductsBasket',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=ProductBasket.js.map