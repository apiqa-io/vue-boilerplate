module.exports = sequelize => {
  const User = sequelize.import('User')

  return {
    User
  }
}
