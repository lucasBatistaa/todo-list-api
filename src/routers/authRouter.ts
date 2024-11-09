import express from 'express'
import login from '../controllers/auth/login'
import logout from '../controllers/auth/logout'
import authentication from '../middleware/authentication'

const router = express.Router()

router.post('/login', login)
router.post('/logout', authentication, logout)

export default router