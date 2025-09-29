// importing mongoose
const mongoose = require('mongoose')

// defining user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['ROLE_USER', 'ROLE_ADMIN'],
        default: 'ROLE_USER',
    },
}, {
    timestamps: true,
    versionKey: false,
})

const User = mongoose.model('User', userSchema)
module.exports = User