'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.createTable('Baskets', {
                    id: {
                        type: Sequelize.DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    userId: {
                        type: Sequelize.DataTypes.INTEGER,
                        allowNull: true,
                        references: {
                            model: {
                                tableName: 'Users',
                                schema: 'public'
                            },
                            key: 'id'
                        }
                    },
                    state: {
                        type: Sequelize.DataTypes.STRING(256),
                        allowNull: false
                    },
                    externalRef: {
                        type: Sequelize.DataTypes.STRING(256),
                        allowNull: true
                    },
                    bill: {
                        type: Sequelize.DataTypes.BLOB,
                        allowNull: true
                    },
                    createdAt: {
                        type: Sequelize.DataTypes.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DataTypes.DATE
                    }
                }, {transaction: t}),

                queryInterface.createTable('ProductsBasket', {
                    id: {
                        type: Sequelize.DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    categoryId: {
                        type: Sequelize.DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'Categories',
                                schema: 'public'
                            },
                            key: 'id'
                        }
                    },
                    productId: {
                        type: Sequelize.DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'Products',
                                schema: 'public'
                            },
                            key: 'id'
                        }
                    },
                    basketId: {
                        type: Sequelize.DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'Baskets',
                                schema: 'public'
                            },
                            key: 'id'
                        }
                    },
                    priceId: {
                        type: Sequelize.DataTypes.INTEGER,
                        allowNull: true,
                        references: {
                            model: {
                                tableName: 'Prices',
                                schema: 'public'
                            },
                            key: 'id'
                        }
                    },
                    quantity: {
                        type: Sequelize.DataTypes.INTEGER,
                        allowNull: false
                    },
                    createdAt: {
                        type: Sequelize.DataTypes.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DataTypes.DATE
                    }
                },{transaction: t})
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.dropTable('ProductsBasket', {transaction: t}),
                queryInterface.dropTable('Baskets', {transaction: t})
            ])
        })
    }
};
