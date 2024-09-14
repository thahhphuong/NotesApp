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
module.exports = {
    authenticateToken
}