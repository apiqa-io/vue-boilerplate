import { Router } from 'express'
import passport from 'passport'

const router = Router()

export const loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/admin/login')
  }
}

export const loggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/admin')
  }
}

router.get('/login', loggedOut, (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('login')
  } else {
    res.redirect('/admin')
  }
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin/',
  failureRedirect: '/admin/login'
}))

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/admin/login')
})

export default router
