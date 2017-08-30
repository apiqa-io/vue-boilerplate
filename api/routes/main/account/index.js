const express = require('express')
const passport = require('passport')

const router = express.Router()

router
  .get('/', passport.auth(), (req, res, next) => {
    res.json({ client: req.user })
  })

module.exports = router
