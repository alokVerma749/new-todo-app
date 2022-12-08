const setCookies = (user, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    const token = user.getJwtToken()
    user.password = undefined

    res.cookie('token', token, cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })
}

export default setCookies

