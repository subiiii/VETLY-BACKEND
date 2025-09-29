//importing express
const express = require('express')
const { signup, login, viewPets} = require('../controller/user.controller')
const {isAuthenticated} = require('../utils/auth')
const { buyPet} = require('../controller/pet.controller')

//creating router
const route = express.Router()

//user registration route
route.post('/signup', signup)
route.post('/login', login)
route.get('/viewPets', isAuthenticated, viewPets)
route.post('/buyPet/:id', isAuthenticated, buyPet)
//exporting router
module.exports = route;