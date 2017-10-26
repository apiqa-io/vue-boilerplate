const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const rfs = require('rotating-file-stream')

const passport = require('./passport')
const adminRoutes = require('./routes/admin')
const mainRoutes = require('./routes/main')

const app = express()

app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

if (process.env.ENVIRONMENT !== 'dev') {
  const logDirectory = path.join(__dirname, 'log')

  // create a rotating write stream
  const accessLogStream = rfs('api.log', {
    interval: '1d', // rotate daily
    path: logDirectory
  })
  app.use(morgan('combined', {stream: accessLogStream}))
}
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize())

app.use('/admin', adminRoutes)
app.use('/', mainRoutes)

app.use((req, res, next) => {
  const err = new Error(`Not Found: ${req.path}`)
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  console.error(err) // eslint-disable-line no-console
  res
    .status(err.status || 500)
    .json({
      status: 'error',
      message: err.message
    })
})

const PORT = 80
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) // eslint-disable-line no-console
