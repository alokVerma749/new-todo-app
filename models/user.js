import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        maxLength: [20, 'Username cannot be more than 20 characters'],
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email already exist']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false
    },
    todos: [String]


}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods = {
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    },
    getJwtToken:  function () {
        return jwt.sign(
            {
                id: this._id
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY
            }
        )
    }
}