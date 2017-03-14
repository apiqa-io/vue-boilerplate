import express from 'express'
import bodyParser from 'body-parser'
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const config = require('/configs/app.config')
const passport = require('./passport')
const adminRoutes = require('./routes/admin')

const app = express()

app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  name: 'sid',
  secret: '!4X*jg)w(jyw}qW7cx&J',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    host: config.redis.host,
    port: config.redis.port
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/admin', adminRoutes)

app.get('/', (req, res, next) => {
  res.json({ status: 'ok', response: 'Hello World!' })
})

app.get('/ping', (req, res, next) => {
  res.json({ status: 'ok', response: `pong: ${req.query.message || ''}` })
})

app.use((req, res, next) => {
  const err = new Error(`Not Found: ${req.path}`)
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  console.error(err)
  res
    .status(err.status || 500)
    .json({
      status: 'error',
      message: err.message
    })
})

const PORT = 80
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
