import express from 'express'
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

router.get('/gettodos', getTodos)
router.post('/createtodo', createTodo)
router.delete('/deletetodo/:todoid', deleteTodo)
router.put('/edittodo/:todoid', editTodo)
router.get('/gettodo/:todoid', getTodo)
router.post('/task/createtask/:todoid', createTask)
router.get('/task/gettasks/:todoid', getTasks)
router.delete('/task/deletetask/:todoid', deleteTask)

export default router