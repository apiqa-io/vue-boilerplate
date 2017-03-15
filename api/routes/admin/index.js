const express = require('express')
const passport = require('passport')
const router = express.Router()

const { models } = require('db')

router
.get('/', (req, res) => {
  res.send('Ok!')
})
.get('/account', (req, res, next) => {
  if (req.isAuthenticated()) {
    models.User.findById(req.session.passport.user)
    .then(user => {
      if (!user) {
        res.status(403).send('User not found')
      } else {
        res.send({ user: user.toJSON() })
      }
    })
    .catch(next)
  } else {
    res.status(403).send('Auth failed')
  }
})
.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(403).send('Wrong credentials')
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      return res.send({ user: user })
    })
  })(req, res, next)
})
.get('/logout', (req, res) => {
  req.logOut()
  res.send('Logged Out')
})

module.exports = router
