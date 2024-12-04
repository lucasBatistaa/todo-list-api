import express from 'express'

import authentication from '../middleware/authentication'

import getList from '../controllers/lists/getList'
import createList from '../controllers/lists/createList'
import allLists from '../controllers/lists/allLists'
import allFavorites from '../controllers/lists/allFavorites'
import editNameList from '../controllers/lists/editNameList'
import editLabel from '../controllers/lists/editLabel'
import editFavorite from '../controllers/lists/editFavorite'
import deleteList from '../controllers/lists/deleteList'
import editIconList from '../controllers/lists/editIconList'

const router = express.Router()

router.get('/:id', authentication, getList)

router.post('/favorites', authentication, allFavorites)
router.post('/all', authentication, allLists)
router.post('/create', authentication, createList)

router.patch('/:id/name', authentication, editNameList)
router.patch('/:id/labels', authentication, editLabel)
router.patch('/:id/favorite', authentication, editFavorite)
router.patch('/:id/icon', authentication, editIconList)

router.delete('/:id', authentication, deleteList)

export default router   