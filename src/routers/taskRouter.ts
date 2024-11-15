import express from 'express'

import allTasks from '../controllers/tasks/allTasks'
import createTask from '../controllers/tasks/createTask'
import editNameTask from '../controllers/tasks/editNameTask'
import editDateTask from '../controllers/tasks/editDateTask'
import editIsCheckedTask from '../controllers/tasks/editIsCheckedTask'
import editPriorityTask from '../controllers/tasks/editPriorityTask'
import deleteTask from '../controllers/tasks/deleteTask'

const router = express.Router()

router.get('/:listId/all', allTasks)

router.post('/create', createTask)

router.patch('/:id/name', editNameTask)
router.patch('/:id/date', editDateTask)
router.patch('/:id/isChecked', editIsCheckedTask)
router.patch('/:id/priority', editPriorityTask)

router.delete('/:id', deleteTask)

export default router