import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../utils/customError.js'
import Todo from '../models/todo.js'
import User from '../models/user.js'

// Helper function
const getTheUser = async (userid) => {
    try {
        const user = await User.findById(userid)
        if (!user) {
            throw new CustomError('User not valid', 401)
        }
        return user
    } catch (error) {
        throw new CustomError(error.message, error.code)
    }
}

// this controller will be used to fetch all todos of loggedin user
export const getTodos = asyncHandler(async (req, res) => {
    // getting user from token
    const user = await getTheUser(req.user)
    // from user getting todo ids
    const todoidArray = user.todos
    // storing whole todo using todo ids
    const todoArray = todoidArray.map(async (todoid) => {
        return await Todo.findById(todoid)
    })
    if (!todoArray) {
        throw new CustomError('unable to fetch all todos', 400)
    }
    res.status(200).json({
        success: true,
        message: 'todos fetched successfully',
        todoArray
    })
})

export const createTodo = asyncHandler(async (req, res) => {
    const { todoTitle } = req.body
    if (!todoTitle) {
        throw new CustomError('Invalid todo title', 400)
    }
    const userid = req.user
    const user = await getTheUser(userid)
    const todo = await Todo.create({
        name: todoTitle,
        user: userid,
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