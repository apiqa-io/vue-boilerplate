import { Router } from 'express'
import passport from 'passport'

const router = Router()

export const loggedIn = (req, res, next) => {
  if (req.isAuthenticated) {
    next()
  } else {
    res.redirect('/login')
  }
}

export const loggedOut = (req, res, next) => {
  if (!req.isAuthenticated) {
    next()
  } else {
    res.redirect('/')
  }
}

router.get('/login', loggedOut, (req, res) => {
  if (!req.isAuthenticated) {
    res.render('login')
  } else {
    res.redirect('/')
  }
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

export default router
