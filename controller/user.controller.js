//importing user model
const User = require('../models/user.models')

const { mongoose } = require('mongoose')

const Pet = require('../models/pet.model')


//importing bcryptjs for password hashing
const bcrypt = require('bcryptjs')


//importing jsonwebtoken for token generation
const jwt = require('jsonwebtoken')


//new user registration
const signup = async (req, res) => {
    try {
        const { username, email, password} = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
    }

    //check if user already exists with the email
    const existingemail = await User.findOne({ email})
    if (existingemail) {
        return res.status(409).json({ message: 'User already exists try using another email' })
    }
    
    //check if user already exists with the username
    const existingUsername = await User.findOne({ username})
    if (existingUsername) {
        return res.status(409).json({ message: 'Username already taken try using another username' })
    }

    //check if user already exist 
  
    //hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creating new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    await newUser.save()
    res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        console.error('Error during user registration:', error)
        res.status(500).json({ message: 'Server error' })

}
}


// letting user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are requied'})
        }

        //check if user exists
        const user = await User.findOne({ email})
        if (!user) {
            return res.status(404).json({message: 'User not found try signing up' })
        }

        //check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {return res.status(401).json({ message: 'Password is incorrect' })
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )


       res.status(200).json({ message: 'Login successful', token }) 
    } catch (error) {
        console.error('Error during user login:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

// view all available pets for sale
const viewPets = async (req, res) => {
    try {
        const Pet = require('../models/pet.model')
        const pets = await Pet.find()
        if (!pets.length) {
            return res.status(404).json({ message: 'No pets available right now' })
        }
        res.status(200).json(pets)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' })
    }
}
    

module.exports = {
     signup,
     login,
     viewPets
 }