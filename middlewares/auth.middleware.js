import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../utils/customError.js'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'
import User from '../models/user.js'

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
    const token = req.cookies.token
    if (!token) {
        throw new CustomError('Not authorized to access this route', 401)
    }
    try {
        const decodedJwtPayload = jwt.verify(token, config.JWT_SECRET)
        req.user = await User.findOne(decodedJwtPayload.id)
        next()
    } catch (error) {
        throw new CustomError('Not authorized to access this route', 401)
    }
})