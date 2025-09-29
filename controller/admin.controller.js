// importing admin model
const Admin = require('../models/admin.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')


//seeding admin
const seedAdmin = async (req, res) => {
    try {
        console.log('Seeding admin...')

        //connect to database
        await require('../config/db')()

        //default admin credentials from environment variables
        const adminData = {
            username: process.env.ADMIN_USERNAME || 'admin',
            email: process.env.ADMIN_EMAIL || 'admin@yop.com',
            password: process.env.ADMIN_PASSWORD || 'admin1244',
            role: 'ROLE_ADMIN'
            
        }

        //check if admin already exists
        const existingAdmin = await Admin.findOne({ email: adminData.email })
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(adminData.password, salt)

        //create admin user
        const admin = new Admin({
            ...adminData,
            password: hashedPassword
        })
        
        await newAdmin.save()
        res.status(201).json({ message: 'Admin seeded successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

//logging in admin
const adminLogin = async (req, res) => {
    try {
        // Expect { email, password } in the request body.
        // NOTE: removed username requirement as it's not needed for login.
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'email and password are required' })
        }

        // Check if admin exists
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }

        // Compare hashed password
        // Use bcrypt.compare to compare plaintext password with stored hash
        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) return res.status(400).json({ message: 'Password is incorrect' })

        // Create JWT token for the admin.
        // Token payload contains a `user` object so middleware (`utils/auth.js`) can read decoded.user
        // Token includes id, role and username. Adjust expiry as needed.
        const payload = {
            user: {
                id: admin._id,
                role: admin.role || 'ROLE_ADMIN',
                username: admin.username
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })

        // Return token and a minimal user object (no password)
        return res.status(200).json({ message: 'Admin logged in successfully', token, user: { id: admin._id, username: admin.username, email: admin.email, role: admin.role } })

    }catch (error) {
        res.status(500).json({ message: 'Server error' })
}
}
//exporting seedAdmin function
module.exports = { seedAdmin, adminLogin }