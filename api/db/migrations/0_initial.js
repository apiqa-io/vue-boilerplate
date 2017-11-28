const { sequelize } = require('db')

module.exports = {
  up (queryInterface, Sequelize) {
    return sequelize.sync({ force: true })
  }
}
