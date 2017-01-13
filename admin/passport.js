import passport from 'passport'
import LocalStrategy from 'passport-local'

import config from './configs/app.config'

passport.use(new LocalStrategy((username, password, done) => {
  if (config.admin.username == username && config.admin.password == password) {
    return done(null, username)
  } else {
    return done(null, false)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((id, done) => {
  done(null, id)
})

export default passport
