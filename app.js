import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

import user from './routes/user.js'
import todo from './routes/todo.js'

app.use('/user', user)
app.use('/todo', todo)

export default app