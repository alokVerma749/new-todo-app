import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../utils/customError.js'
import Todo from '../models/todo.js'
import User from '../models/user.js'

export const createTodo = asyncHandler(async (req, res) => {
    const { todoTitle } = req.body
    // user === userid
    const userid = req.user
    const user = await User.findById(userid)
    if (!todoTitle) {
        throw new CustomError('Invalid todo title', 400)
    }
    const todo = await Todo.create({
        name: todoTitle,
        user: user,
    })
    // saving todoid in todos array of user model
    user.todos.push(todo._id)
    await user.save()
    res.status(200).json({
        success: true,
        message: 'todo created successfully',
        todo: todo,
        user: user
    })
})

export const deleteTodo = asyncHandler(async (req, res) => {
    const { todoid } = req.params
    if (!todoid) {
        throw new CustomError('unable to get todo id', 400)
    }
    const todo = await Todo.findByIdAndDelete(todoid)
    if (!todo) {
        throw new CustomError('unable to delete todo', 400)
    }
    res.status(200).json({
        success: true,
        message: 'todo deleted successfully',
        todo
    })
})

export const editTodo = asyncHandler(async (req, res) => {
    const { todoid } = req.params
    const { text } = req.body
    if (!todoid) {
        throw new CustomError('unable to get todo id', 400)
    }
    const todo = await Todo.findByIdAndUpdate(todoid, {
        name: text
    })
    if (!todo) {
        throw new CustomError('unable to update todo', 400)
    }
    res.status(200).json({
        success: true,
        message: 'todo edited successfully',
        todo
    })
})

export const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find()
    if (!todos) {
        throw new CustomError('unable to fetch all todos', 400)
    }
    res.status(200).json({
        success: true,
        message: 'tods fetched successfully',
        todos
    })
})

export const getTodo = asyncHandler(async (req, res) => {
    const { todoid } = req.params
    const todo = await Todo.findById(todoid)
    if (!todo) {
        throw new CustomError('unable to fetch the todo', 400)
    }
    res.status(200).json({
        success: true,
        message: 'tod0 fetched successfully',
        todo
    })
})


export const createTask = asyncHandler(async (req, res) => {
    const { todoid } = req.params
    if (!todoid) {
        throw new CustomError('unable to get todo id', 400)
    }
    const todo = await Todo.findById(todoid)
    if (!todo) {
        throw new CustomError('unable to find todo id', 400)
    }
    const { task } = req.body
    todo.tasks.push(task)
    await todo.save()
    res.status(200).json({
        success: true,
        message: 'task added successfully',
        todo
    })
})

export const getTasks = asyncHandler(async (req, res) => {
    const { todoid } = req.params
    if (!todoid) {
        throw new CustomError('unable to get todo id', 400)
    }
    const todo = await Todo.findById(todoid)
    if (!todo) {
        throw new CustomError('unable to find todo id', 400)
    }
    const tasks = todo.tasks
    res.status(200).json({
        success: true,
        message: 'task fetched successfully',
        tasks
    })
})

export const deleteTask = asyncHandler(async (req, res) => {
    const { todoid } = req.params
    if (!todoid) {
        throw new CustomError('unable to get todo id', 400)
    }
    const todo = await Todo.findById(todoid)
    if (!todo) {
        throw new CustomError('unable to find todo id', 400)
    }
    const { task } = req.body
    todo.tasks.pull(task)
    await todo.save()
    res.status(200).json({
        success: true,
        message: 'task deleted successfully',
        todo
    })
})