import express from 'express'
import cookieParser from 'cookie-parser'
import { isLoggedIn } from './middlewares/auth.middleware.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

import user from './routes/user.js'
import todo from './routes/todo.js'

app.use('/user', user)
// DASHBOARD
app.use('/todo', isLoggedIn, todo)

export default app