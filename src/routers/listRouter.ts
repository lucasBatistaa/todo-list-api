import express from 'express'

import createList from '../controllers/lists/createList'
import allLists from '../controllers/lists/allLists'
import allFavorites from '../controllers/lists/allFavorites'
import editNameList from '../controllers/lists/editNameList'
import editLabel from '../controllers/lists/editLabel'
import editFavorite from '../controllers/lists/editFavorite'
import deleteList from '../controllers/lists/deleteList'
import authentication from '../middleware/authentication'
import editIconList from '../controllers/lists/editIconList'

const router = express.Router()

router.get('/all', allLists)
router.get('/favorites', allFavorites)

router.post('/create', createList)

router.patch('/:id/name', editNameList)
router.patch('/:id/labels', editLabel)
router.patch('/:id/favorites', editFavorite)
router.patch('/:id/icon', editIconList)

router.delete('/:id', deleteList)

export default router   