import express from 'express'

import login from '../controllers/auth/login'
import logout from '../controllers/auth/logout'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)

export default router