import express from 'express'

import allTasks from '../controllers/tasks/allTasks'
import createTask from '../controllers/tasks/createTask'
import editNameTask from '../controllers/tasks/editNameTask'
import editDateTask from '../controllers/tasks/editDateTask'
import editIsCheckedTask from '../controllers/tasks/editIsCheckedTask'
import editPriorityTask from '../controllers/tasks/editPriorityTask'
import deleteTask from '../controllers/tasks/deleteTask'

import authentication from '../middleware/authentication'

const router = express.Router()

router.get('/:listId/all', authentication, allTasks)

router.post('/create', authentication, createTask)

router.patch('/:id/name', authentication, editNameTask)
router.patch('/:id/date', authentication, editDateTask)
router.patch('/:id/isChecked', authentication, editIsCheckedTask)
router.patch('/:id/priority', authentication, editPriorityTask)

router.delete('/:id', authentication, deleteTask)

export default router