//import mongoose
const mongoose = require('mongoose')

//defining pet schema
const petSchema = new mongoose.Schema({
    breedName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },//age in months
    pictureUrl: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }, //cost in naira
    quantity: {
        type: Number,
        required: true,
        default: 1
       
    }

})

//export model
const Pet = mongoose.model('Pet', petSchema)
module.exports = Pet;