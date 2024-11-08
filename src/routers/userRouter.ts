import express from 'express'
import createUser from '../controllers/users/createUser'

const router = express.Router()

router.post('/create', createUser)