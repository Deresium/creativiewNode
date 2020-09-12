'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.createTable('Contacts', {
                    id: {
                        type: Sequelize.DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    email: {
                        type: Sequelize.DataTypes.STRING(256),
                        allowNull: false,
                    },
                    firstName: {
                        type: Sequelize.DataTypes.STRING(256),
                        allowNull: false
                    },
                    name: {
                        type: Sequelize.DataTypes.STRING(256),
                        allowNull: false
                    },
                    message: {
                        type: Sequelize.DataTypes.STRING(4000),
                        allowNull: false
                    },
                    createdAt: {
                        type: Sequelize.DataTypes.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DataTypes.DATE
                    }
                }, {transaction: t}),

                queryInterface.createTable('Galleries', {
                    id: {
                        type: Sequelize.DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    name: {
                        type: Sequelize.DataTypes.STRING(256),
                        allowNull: false
                    },
                    descriptionFr: {
                        type: Sequelize.DataTypes.STRING(4000),
                        allowNull: false
                    },
                    descriptionEn: {
                        type: Sequelize.DataTypes.STRING(4000),
                        allowNull: false
                    },
                    createdAt: {
                        type: Sequelize.DataTypes.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DataTypes.DATE
                    }
                }, {transaction: t}),

                queryInterface.createTable('Photos', {
                    id: {
                        type: Sequelize.DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    name: {
                        type: Sequelize.DataTypes.STRING(256),
                        allowNull: false
                    },
                    type: {
                        type: Sequelize.DataTypes.STRING(256),
                        allowNull: false
                    },
                    picture: {
                        type: Sequelize.DataTypes.BLOB,
                        allowNull: false
                    },
                    galleryId: {
                        type: Sequelize.DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'Galleries',
                                schema: 'public'
                            },
                            key: 'id'
                        }
                    },
                    createdAt: {
                        type: Sequelize.DataTypes.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DataTypes.DATE
                    }
                }, {transaction: t}),

                queryInterface.createTable('Askings', {
                    id: {
                        type: Sequelize.DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    fullName: {
                        type: Sequelize.DataTypes.STRING(256),
                        allowNull: false
                    },
                    email: {
                        type: Sequelize.DataTypes.STRING(256),
                        allowNull: false,
                    },
                    photoId: {
                        type: Sequelize.DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'Photos',
                                schema: 'public'
                            },
                            key: 'id'
                        }
                    },
                    clientId: {
                        type: Sequelize.DataTypes.STRING(256)
                    },
                    amount: {
                        type: Sequelize.DataTypes.FLOAT
                    },
                    paymentState: {
                        type: Sequelize.DataTypes.STRING(256)
                    },
                    createdAt: {
                        type: Sequelize.DataTypes.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DataTypes.DATE
                    }
                }, {transaction: t})
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.dropTable('Contacts',{transaction: t}),
                queryInterface.dropTable('Askings', {transaction: t}),
                queryInterface.dropTable('Photos', {transaction: t}),
                queryInterface.dropTable('Galleries', {transaction: t})
            ])
        })
    }
};
