const Pet = require('../models/pet.model')
const mongoose = require('mongoose')
const cloudinary = require('../config/cloudinary')

//add new pet
const addPet = async (req, res) => {
    try {
        const { breedName, age, pictureUrl, cost, quantity } = req.body
        //validate input
        if (!breedName || !age || !pictureUrl || !cost) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        //check if pet already exists
        const existingPet = await Pet.findOne({ breedName, age, pictureUrl})
        if (existingPet) {
            return res.status(400).json({ message: 'Pet already exists' })
        }

        //create new pet
        const newPet = new Pet({ breedName, age, pictureUrl, cost, quantity })

        //save pet to database
        await newPet.save()

        res.status(201).json({ message: 'Pet added successfully', pet: newPet })
    } catch (error) {
        res.status(500).json({ message: ' Internal Server error' })
    }
}

//get all pets
const getAllPets = async (req, res) => {
    try {
        const pets =  await Pet.find()
        if (!pets.length) {
            return res.status(404).json({ message: 'No pets available right now' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' })
    }
}

//update pet details
const updatePet = async (req, res) => {
    try {
        const {id} = req.params
        const pet = await Pet.findByIdAndUpdate(id, req.body, { new: true })
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found'})
        }

        //check if something is being updated
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Enter field to update' })
        }
        
        //return success message
        res.status(200).json({ message: 'Pet updated successfully', pet })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' })
    }
}

//delete pet
const deletePet = async (req, res) => {
    try {
        const {id} = req.params
        const pet = await Pet.findByIdAndDelete(id)

        //check if pet exists
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found to delete'})
        }
        res.status(200).json({ message: 'Pet deleted successfully' })

        //catch error
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' })
    }
}

// Buy pet (reduce quantity)
const buyPet = async (req, res) => {
    try {
        const { id } = req.params
        const pet = await Pet.findById(id)
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' })
        }
        //check if pet is in stock
        if (pet.quantity <= 0) {
            return res.status(400).json({ message: 'Pet is out of stock' })
        }
        //reduce quantity by 1
        pet.quantity -= 1

        //save the updated pet
        await pet.save()
        res.status(200).json({ message: 'Pet purchased successfully' })

        //catch error
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' })
    }
}

// post dog picture
const uploadDogPicture = async (req, res) => {
    try {
        const { id } = req.params
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        // upload to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path)
        const pet = await Pet.findById(id)
        pet.pictureUrl = result.secure_url
        await pet.save()

        return res.status(200).json({ message: " Dog Picture uploaded successfully" })
    } catch (error) {
        console.error("Error uploading dog picture", error)
        return res.status(500).json({ message: " server error"})
    }
}


//exporting functions
module.exports = { addPet, getAllPets, updatePet, deletePet, buyPet, uploadDogPicture }