import User from '../models/user.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../utils/customError.js'
import setCookies from '../utils/setCookies.js'

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new CustomError('Each field is required', 400)
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new CustomError('User already registered', 400)

    }
    const user = await User.create({
        name: name,
        email: email,
        password: password
    })
    if (!user) {
        throw new CustomError('failed to register user', 401)
    }
    res.status(200).json({
        success: true,
        message: 'user created successfully',
        user,
    })
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new CustomError('Each field is required', 400)
    }
    const user = await User.findOne({ email }).select('+password')
    console.log(user)
    if (!user) {
        throw new CustomError('user is not registered', 400)
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError('Invalid credentials', 400)
    }
    setCookies(user, res)
})