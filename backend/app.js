const express = require('express')
const mongoose = require("mongoose")
const config = require("./config.json")
const User = require("./models/user.model")
const jwt = require("jsonwebtoken")
const { authenticateToken } = require('./untils/jwt')
const Note = require('./models/note.model')
require('dotenv').config()
mongoose.connect(config.connectString)
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('error', err => {
    console.log(err);
});
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

        return res.status(200).json({
            error: false, data: {
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
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN, {
        expiresIn: "8h"
    })
    return res.status(200).json({
        error: false, data: {
            token: accessToken,
            user
        },
        message: "Register success"
    })

})


// CRUD
app.post("/note", authenticateToken, async (req, res) => {
    const { title,
        content,
        tags } = req.body
    const { user } = req.user
    const userId = user?._id
    const newNote = new Note({
        title,
        content,
        tags: tags || [],
        userId
    })
    if (!content) {
        return res.status(400).json({
            error: true,
            message: "content is required"
        })
    }
    if (!title) {
        return res.status(400).json({
            error: true,
            message: "title is required"
        })
    }

    await newNote.save()
    return res.status(200).json({
        error: false, data: {
            newNote
        },
        message: "New note created"
    })
})
app.put("/note/:id", authenticateToken, async (req, res) => {
    const { id } = req.params
    const { title,
        content,
        tags } = req.body
    const { user } = req.user
    const userId = user?._id
    const note = await Note.findOne({ _id: id, userId })
    if (!note) {
        return res.status(400).json({
            error: true, message: "Cannot find note"
        })
    }
    const dataUpdate = await Note.findOneAndUpdate({ _id: id }, {
        $set: {
            title,
            content,
            tags
        }
    }, {
        new: true
    })

    return res.status(200).json({
        error: false, data: {
            dataUpdate
        },
        message: "New note updated"
    })
})


app.get("/note", authenticateToken, async (req, res) => {
    const { skip = 0, limit = 10 } = req.query
    const notes = await Note.find().skip(+skip).limit(+limit).sort({ created: -1 })
    return res.status(200).json({
        error: true,
        data: notes
    })
})
app.get("/note/:id", authenticateToken, async (req, res) => {
    const { id } = req.params
    const note = await Note.findById(id)
    return res.status(200).json({
        error: true,
        data: note
    })
})
app.delete("/note/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params
        const { user } = req.user
        const userId = user?._id
        const note = await Note.findOne({ _id: id, userId })

        if (!note) {
            return res.status(400).json({
                error: true, message: "Cannot find note"
            })
        }
        await Note.deleteOne({ _id: id })
        return res.status(200).json({
            error: true,
            message: "delete success"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error?.messgae
        })
    }
})
app.listen(3000, () => {
    console.log("app listening on port 3000")
})


module.exports = app