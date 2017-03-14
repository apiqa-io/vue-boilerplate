const Sequelize = require('sequelize')

const config = require('/configs/app.config')
const initModels = require('./models')

const sequelize = new Sequelize(
  config.db.dbname,
  config.db.username,
  config.db.password, {
    dialect: 'postgres',
    host: config.db.host,
    port: config.db.port,
    logging: process.env.ENVIRONMENT === 'dev' ? console.log : false,
    timezone: '+05:00'
  })

const models = initModels(sequelize)

module.exports = {
  models,
  sequelize
}
