var merge = require('webpack-merge')
var prodEnv = require('./env.prod')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})