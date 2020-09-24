'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.createTable('Roles', {
                    code: {
                        type: Sequelize.DataTypes.STRING(10),
                        primaryKey: true
                    },
                    wording: {
                        type: Sequelize.DataTypes.STRING(64),
                        allowNull: false
                    },
                    createdAt: {
                        type: Sequelize.DataTypes.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DataTypes.DATE
                    }
                }, {transaction: t}),

                queryInterface.createTable('Users', {
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
                    password: {
                        type: Sequelize.DataTypes.STRING(1024)
                    },
                    salted: {
                        type: Sequelize.DataTypes.STRING(1024)
                    },
                    googleId: {
                        type: Sequelize.DataTypes.STRING(1024)
                    },
                    roleCode: {
                        type: Sequelize.DataTypes.STRING(10),
                        defaultValue: 'USER',
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'Roles',
                                schema: 'public'
                            },
                            key: 'code'
                        }
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
                queryInterface.dropTable('Users',{transaction: t}),
                queryInterface.dropTable('Roles',{transaction: t})
            ])
        })
    }
};
