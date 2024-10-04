const jwt = require("jsonwebtoken")
require('dotenv').config()

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) return res.status(401).json({
        error: true,
        message: "authentication"
    })
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: 'Invalid token'
            })
        }
        req.user = user
        next()
    })
}

const verifyRefreshToken = async (refreshToken) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
        if (err) {
            return { error: true, message: "Invalid refresh token" };
        }
        return decoded

    })

}
const generateTokens = async (user) => {
    const accessToken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN, {
        expiresIn: 30
    })
    const refreshToken = jwt.sign({ user: user }, process.env.REFRESH_TOKEN, {
        expiresIn: 40
    })
    return { accessToken, refreshToken }
}
module.exports = {
    authenticateToken, verifyRefreshToken, generateTokens
}