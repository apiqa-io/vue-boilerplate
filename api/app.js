const express = require('express')
const bodyParser = require('body-parser')

const passport = require('./passport')
const adminRoutes = require('./routes/admin')
const mainRoutes = require('./routes/main')

const app = express()

app.disable('x-powered-by')

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
