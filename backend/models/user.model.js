// import mongoose from 'mongoose';
const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
    created: { type: Date, default: new Date().getTime() }
})
const User = mongoose.model('user', userSchema);
module.exports = User