//importing express
const express = require('express')

//importing dotenv
const dotenv = require('dotenv')

//importing mongoose
const mongoose = require('mongoose')

//importing database connection
const connectDB = require('./config/db')

//importing routes
const userRoutes = require('./routes/user.routes')
const adminRoutes = require('./routes/admin.route')
const petRoutes = require('./routes/pet.routes')
//configure dotenv
dotenv.config()

const server = express()

server.use(express.json())

const PORT = process.env.PORT || 5000

server.get('/', (req, res) => {
    res.send('API is running...')
})

server.use('/api/users', userRoutes)
server.use('/api/admin', adminRoutes)
server.use('/api/pets', petRoutes)

//connecting to database
server.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is running on port ${PORT}`)
})