const { sequelize } = require('db')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return sequelize.sync({ force: true })
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
