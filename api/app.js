import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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
