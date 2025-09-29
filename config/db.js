
// importing mongoose
const mongoose = require('mongoose')
//connecting to mongodb
const connnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        process.exit(1)
    }
    
}
module.exports = connnectDb