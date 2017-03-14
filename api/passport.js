const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { models } = require('./db')
const _ = require('lodash')

// const config = require('/configs/app.config')

passport.use(new LocalStrategy((username, password, done) => {
  models.User.findOne({
    where: {
      username: username
    }
  })
  .then(user => {
    if (!user) {
      done(null, false)
    } else {
      user.comparePassword(password).then(passwordOk =>
        passwordOk ? done(null, user) : done(null, false)
      )
    }
  })
  .catch(done)
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  models.User.findById(userId)
  .then(user => done(null, _.pick(user, ['id', 'name', 'role'])))
  .catch(err => done(err))
})

module.exports = passport
