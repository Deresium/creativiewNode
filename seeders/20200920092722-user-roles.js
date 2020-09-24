'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Roles', [{
            code: 'USER',
            wording: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            code: 'ADMIN',
            wording: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            code: 'OWNER',
            wording: 'owner',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Roles', null, {});
    }
};
