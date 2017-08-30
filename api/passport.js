const passport = require('passport')
const passportJWT = require('passport-jwt')

const { jwtSecret } = require('config')
const { db } = require('./db')

const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader(),
  secretOrKey: jwtSecret
}

passport.use(new passportJWT.Strategy(jwtOptions, async (jwtPayload, done) => {
  try {
    let object = {}
    if (jwtPayload.client) {
      object = await db.Client.findOne({
        where: {
          id: jwtPayload.client.id
        }
      })
    } else {
      object = await db.User.findOne({
        where: {
          id: jwtPayload.user.id
        }
      })
    }

    if (!object) {
      done(null, false)
    } else {
      done(null, {
        id: object.id
      })
    }
  } catch (e) {
    console.log(e)
    done(null, false)
  }
}))

passport.auth = () => passport.authenticate('jwt', { session: false })

module.exports = passport
