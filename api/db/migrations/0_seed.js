const { sequelize } = require('db')

module.exports = {
  up (queryInterface, Sequelize) {
    return sequelize.models.user.create({
      email: 'admin@mail.ru',
      password: 'admin'
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.delete('users', { email: 'admin@mail.ru' })
  }
}
