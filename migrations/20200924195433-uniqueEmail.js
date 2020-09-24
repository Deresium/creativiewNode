'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      queryInterface.addConstraint('Users', {
        fields: ['email'],
        type: 'unique',
        name: 'unique_constraint_email'
      }, {transaction: t});
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.removeConstraint('Users', 'unique_constraint_email', {transaction: t});
    })
  }
};