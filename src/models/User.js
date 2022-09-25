
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    wallet:[    
    
        
    ]
})

const UserModel = mongoose.model("User", userSchema, "usersdb");

module.exports = UserModel;