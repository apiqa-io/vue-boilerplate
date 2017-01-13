import { Router } from 'express'
import login, { loggedIn } from './login'

const router = Router()

router.use('/', login)

router.get('/', loggedIn, (req, res) => {
  res.render('index', { title: 'Admin Panel' })
})

export default router
