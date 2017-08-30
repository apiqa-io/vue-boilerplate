const { sequelize } = require('db')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return sequelize.models.user.create({
      email: 'admin@mail.ru',
      password: 'admin'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.delete('users', { username: 'admin' })
  }
}
