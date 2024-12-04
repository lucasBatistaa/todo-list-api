import express from 'express'

import allLabels from '../controllers/labels/allLabels'
import createLabel from '../controllers/labels/createLabel'
import deleteLabel from '../controllers/labels/deleteLabel'
import editNameLabel from '../controllers/labels/editNameLabel'

import authentication from '../middleware/authentication'

const router = express.Router()

router.post('/all', authentication, allLabels)
router.post('/create', authentication, createLabel)

router.patch('/:id/name', authentication, editNameLabel)

router.delete('/:id', authentication, deleteLabel)

export default router