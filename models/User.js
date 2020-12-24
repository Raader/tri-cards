const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cake: { type: Date, default: Date.now }
})

const User = mongoose.Model("User",userSchema)

module.exports = User;