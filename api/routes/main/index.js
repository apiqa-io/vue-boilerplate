const express = require('express')
const router = express.Router()

const accountRoutes = require('./account')

router.use('/account', accountRoutes)

router
.get('/', (req, res) => {
  res.send('Ok!')
})

module.exports = router
