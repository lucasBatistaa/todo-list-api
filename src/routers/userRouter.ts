import express from 'express'

import authentication from '../middleware/authentication'

import loggedUser from '../controllers/users/loggedUser'
import createUser from '../controllers/users/createUser'

const router = express.Router()

router.post('/create', createUser)
router.post('/logged', authentication, loggedUser)

export default router