// import mongoose from 'mongoose';
const mongoose = require("mongoose")
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    created: { type: Date, default: new Date().getTime() }
})
const Note = mongoose.model('note', noteSchema);

module.exports = Note