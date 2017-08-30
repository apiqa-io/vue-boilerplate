const Sequelize = require('sequelize')

const initModels = require('db/models')

let { db } = require('config')

const sequelize = new Sequelize(
  db.database,
  db.username,
  db.password, {
    dialect: db.dialect,
    host: db.host,
    port: db.port,
    logging: process.env.ENVIRONMENT === 'dev' ? console.log : false
  })

db = initModels(sequelize)

module.exports = {
  db,
  sequelize
}
