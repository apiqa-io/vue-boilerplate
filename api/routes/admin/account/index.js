const jwt = require('jsonwebtoken')
const express = require('express')
const passport = require('passport')

const { jwtSecret, jwtTtl } = require('config')
const { db } = require('db')

const router = express.Router()

router
  .get('/', passport.auth(), async (req, res, next) => {
    let user = await db.User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'no such user found' })
    }
    res.json({ token: jwt.sign({ user: user.toJSON() }, jwtSecret, { expiresIn: jwtTtl }) })
  })
  .post('/', async (req, res, next) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!user) {
        return res.status(404).json({ message: 'no such user found' })
      }
      let compare = await user.comparePassword(req.body.password)
      if (compare.success) {
        res.json({ token: jwt.sign({ user: user.toJSON() }, jwtSecret, { expiresIn: jwtTtl }) })
      } else {
        throw Error('password did not match')
      }
    } catch (err) {
      console.log(err, 'password did not match')
      res.status(401).json({ message: 'password did not match' })
    }
  })
  .post('/change-password', passport.auth(), async (req, res, next) => {
    try {
      let user = await db.Client.findById(req.user.id)
      if (!user) {
        return res.status(404).json({ message: 'no user found' })
      }
      let compare = await user.comparePassword(req.body.oldPassword)
      if (compare.success) {
        await user.update({ password: req.body.newPassword })
      }
      res.json({ status: 'Success!' })
    } catch (e) {
      return res.status(500).json({ message: 'password did not match' })
    }
  })

module.exports = router
