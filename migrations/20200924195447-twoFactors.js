'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.addColumn('Users', 'twoFactors', {
        type: Sequelize.DataTypes.STRING(1024)
      },{transaction: t});
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.removeColumn('Users', 'twoFactors', {transaction: t});
    });

  }
};
