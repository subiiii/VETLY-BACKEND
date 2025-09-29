//import mongoose
const mongoose = require('mongoose')

//importing bcryptjs
const bcrypt = require('bcryptjs')

//defining admin schema
const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'ROLE_ADMIN'
    }
})

//exporting admin model
const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin