const { model } = require("mongoose");

const mongoose = requeri("mongoose");
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        unique: true,
        select: false,
    },
    createdAt:{
        typw: Date,
        default: Date,now,
    }

});

const User = mongoose.model("User", userSchema);
module.exports = user;