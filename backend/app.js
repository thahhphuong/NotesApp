const express = require('express')
const mongoose = require("mongoose")
const config = require("./config.json")
const User = require("./models/user.model")
const jwt = require("jsonwebtoken")
require('dotenv').config()
mongoose.connect(config.connectString)
const app = express()

app.use(express.json())
app.get('/', function (req, res) {
    res.send('Hello World')
})
app.post('/register', async (req, res) => {
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
        const newUser = new User({
            fullName, email, password
        })
        await newUser.save()
        const accessToken = jwt.sign({ newUser }, process.env.ACCESS_TOKEN, {
            expiresIn: "30m"
        })
        return res.status(200).json({
            error: false, data: {
                token: accessToken,
                newUser
            },
            message: "Register success"
        })
    } catch (error) {
        return res.status(400).json({ error: error?.message })
    }
})
app.post("/login", async (req, res) => {
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

})
app.listen(3000, () => {
    console.log("app listening on port 3000")
})


module.exports = app