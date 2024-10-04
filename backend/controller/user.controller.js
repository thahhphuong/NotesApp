const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const { verifyRefreshToken, generateTokens } = require("../untils/jwt")
const redisService = require("../services/connection.redis")

exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        if (!fullName) {
            return res.status(400).json({
                error: true,
                message: "Fullname is required"
            })
        }
        if (!email) {
            return res.status(400).json({
                error: true,
                message: "email is required"
            })
        }
        if (!password) {
            return res.status(400).json({
                error: true,
                message: "password is required"
            })
        }
        const isUser = await User.findOne({ email })
        if (isUser) {
            return res.status(400).json({
                error: true,
                message: "user already exist"
            })
        }
        const user = new User({
            fullName, email, password
        })
        await user.save()
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN, {
            expiresIn: "8h"
        })
        return res.status(200).json({
            error: false, data: {
                user,
                accessToken
            },
            message: "Register success"
        })
    } catch (error) {
        return res.status(400).json({ error: true, message: error?.message })
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(400).json({
            error: true,
            message: "email is required"
        })
    }
    if (!password) {
        return res.status(400).json({
            error: true,
            message: "password is required"
        })
    }
    const user = await User.findOne({ email, password })

    if (!user) {
        return res.status(400).json({
            error: true, message: "User not found"
        })
    }
    // const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN, {
    //     expiresIn: "1h"
    // })
    // const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN, {
    //     expiresIn: "3h"
    // })
    const { accessToken, refreshToken } = await generateTokens(user);
    // lưu trữ refresh token
    redisService.setRedis({ key: user?._id?.toString(), value: refreshToken, expireTime: 60 })
    return res.status(200).json({
        error: false, data: {
            accessToken,
            refreshToken,
            user
        },
        message: "Register success"
    })

}
exports.getInformation = async (req, res) => {
    const { user } = req.user
    const info = await User.findById(user?._id).select({
        password: 0
    })
    return res.status(200).json({
        error: false,
        data: info
    })
}

exports.logout = async (req, res) => {
    const { refreshToken } = req.body

    if (!refreshToken) {
        throw Error("refreshTokenn not found")
    }

}
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
        throw Error("refreshTokenn not found")
    }
    const refresh = await verifyRefreshToken(refreshToken)

    if (!refresh) {
        return res.status(400).json({
            error: true,
            message: refresh
        })
    }
    // check redis
    const existRefreshRedisToken = await redisService.getRedis(refresh.user?._id)
    if (!existRefreshRedisToken) {
        return res.status(400).json({
            error: true,
            message: "invalid refresh token redis"
        })
    }
    const { accessToken } = await generateTokens(refresh.user);
    const refreshNewToken = jwt.sign({ user: refresh.user }, process.env.REFRESH_TOKEN, {
        expiresIn: "3h"
    })
    redisService.setRedis({ key: refresh.user?._id?.toString(), value: refreshNewToken, expireTime: 60 })

    return res.status(200).json({
        error: false,
        data: {
            accessToken, refreshNewToken
        }
    })

}