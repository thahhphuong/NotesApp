const express = require('express')
const mongoose = require("mongoose")
const config = require("./config.json")
const User = require("./models/user.model")
const jwt = require("jsonwebtoken")
const cors = require('cors')
const { authenticateToken } = require('./untils/jwt')
const Note = require('./models/note.model')
require('dotenv').config()
mongoose.connect(config.connectString)
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('error', err => {
    console.log(err);
});
const app = express()
const issue2options = {
    origin: true,
    methods: ["POST", "PUT", "DELETE"/* , "GET", "PUT", "DELETE", "PATCH" */],
    credentials: true,
    maxAge: 3600
};
app.use(cors(issue2options))
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
app.get("/information", authenticateToken, async (req, res) => {
    const { user } = req.user
    const info = await User.findById(user?._id).select({
        password: 0
    })
    return res.status(200).json({
        error: false,
        data: info
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
    const { user } = req.user
    const notes = await Note.find({ userId: user?._id }).skip(+skip).limit(+limit).sort({ created: -1 })
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
            error: false,
            message: "delete success"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error?.messgae
        })
    }
})
// update isPinned
app.patch("/pin-note/:id", authenticateToken, async (req, res) => {
    const { id } = req.params
    const { isPinned } = req.body
    const { user } = req.user
    const note = await Note.findById(id)
    if (typeof isPinned != "boolean") {
        return res.status(400).json({
            error: true,
            message: 'type must be boolean'
        })
    }
    if (!note) {
        return res.status(400).json({
            error: true, message: "Cannot find note"
        })
    }
    await Note.updateOne({ _id: id, userId: user?._id }, {
        $set: {
            isPinned: isPinned
        }
    })
    return res.status(200).json({
        error: false, message: "Update ispinned successfully"
    })
})
app.listen(3000, () => {
    console.log("app listening on port 3000")
})


module.exports = app