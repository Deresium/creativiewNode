'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return queryInterface.addColumn('Products', 'vat', {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 12
            },{transaction: t});
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return queryInterface.removeColumn('Products', 'vat', {transaction: t});
        });
    }
}
