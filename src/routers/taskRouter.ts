import express from 'express'
import createTask from '../controllers/tasks/createTask'
import allTasks from '../controllers/tasks/allTasks'

const router = express.Router()

router.get('/:listId/all', allTasks)

router.post('/create', createTask)

router.patch('/:id/name')
router.patch('/:id/date')
router.patch('/:id/name')
router.patch('/:id/isChecked')
router.patch('/:id/priority')

router.delete('/:id')

export default router