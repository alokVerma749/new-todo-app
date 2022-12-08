import express from 'express'
import { isLoggedIn } from '../middlewares/auth.middleware.js'
const router = express.Router()

import {
    createTodo,
    deleteTodo,
    editTodo,
    getTodos,
    getTodo,
    createTask,
    getTasks,
    deleteTask
} from '../controllers/todoController.js'

router.post('/createtodo', isLoggedIn, createTodo)
// router.post('/createtodo', createTodo)
router.delete('/deletetodo/:todoid', deleteTodo)
router.put('/edittodo/:todoid', editTodo)
router.get('/gettodos', getTodos)
router.get('/gettodo/:todoid', getTodo)
router.post('/task/createtask/:todoid', createTask)
router.get('/task/gettasks/:todoid', getTasks)
router.delete('/task/deletetask/:todoid', deleteTask)

export default router