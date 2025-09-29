// import express from 'express'
const express = require('express')

// import mongoose from 'mongoose'
const mongoose = require('mongoose')

// import router from express
const route = express.Router()

// require jwt authentication middleware
const { isAuthenticated } = require('../utils/auth')

//const { isAdmin } = require('../utils/auth')

// import controller functions from pet.controller.js
const { addPet, updatePet, deletePet, buyPet, uploadDogPicture } = require('../controller/pet.controller')
const upload = require('../config/multer')

// route to add a new pet (protected route)
route.post('/add', isAuthenticated, addPet)


// route to update pet details (protected route)
route.put('/update/:id', isAuthenticated, updatePet)

// route to delete a pet (protected route)
route.delete('/delete/:id', isAuthenticated, deletePet)

route.post('/upload/:id', isAuthenticated, upload.single('image'), uploadDogPicture)







//export the router
module.exports = route;