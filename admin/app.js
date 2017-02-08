import path from 'path'

import express from 'express'
import bodyParser from 'body-parser'
import nunjucks from 'nunjucks'
import moment from 'moment'
import session from 'express-session'
import connectRedis from 'connect-redis'

import logger from 'morgan'

import config from '/configs/app.config'
import passport from './passport'
import routes from './routes'

const RedisStore = connectRedis(session)

const app = express()

app.disable('x-powered-by')

app.use(session({
  name: 'sid',
  secret: 'f3Z%i.URdzwv3-1oW"[b,(2tG4uudn',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    host: config.redis.host,
    port: config.redis.port
  })
}))

app.use(passport.initialize())
app.use(passport.session())

const nunjucksEnv = nunjucks.configure('views', {
  noCache: true,
  autoescape: true,
  express: app
})

nunjucksEnv.addFilter('stringify', (obj) => {
  return JSON.stringify(obj || {})
})

nunjucksEnv.addFilter('dateFormat', (date) => {
  return moment(date).format('L')
})

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'njk')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../static')))
app.use('/admin/vendor', express.static(path.join(__dirname, '/node_modules/')))

app.use('/admin', routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err) // eslint-disable-line no-console
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    })
})
const { PORT = 9000 } = process.env
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) // eslint-disable-line no-console
