const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    bday: Date,
    role: String,
    password: String
});

const User = mongoose.model("User", userSchema);
module.exports = User;