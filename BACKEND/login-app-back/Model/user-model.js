const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 5
    }
});

module.exports = mongoose.model("User", userSchema);