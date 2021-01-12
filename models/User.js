const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar_color: String,
    status_msg: String,
    cake: { type: Date, default: Date.now }
})

const User = mongoose.model("User",userSchema)

module.exports = User;