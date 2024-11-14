import express from 'express'

import allLabels from '../controllers/labels/allLabels'
import createLabel from '../controllers/labels/createLabel'
import deleteLabel from '../controllers/labels/deleteLabel'
import editNameLabel from '../controllers/labels/editNameLabel'

const router = express.Router()

router.get('/:userId/all', allLabels)

router.post('/create', createLabel)

router.patch('/:id/name', editNameLabel)

router.delete('/:id', deleteLabel)

export default router