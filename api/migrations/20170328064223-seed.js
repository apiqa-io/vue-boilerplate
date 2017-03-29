'use strict';
const { sequelize } = require('../db')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return sequelize.models.user.create({
        username: 'admin',
        password: 'admin',
        role: 'superadmin'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.delete('users', { username: 'admin' })
  }
};
