const express = require('express');
const { Place } = require('./Schema');
const placeRoute = express.Router();
const User = require('../Users/UserSchema');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../Routes/authMiddleware');
require('dotenv').config();
placeRoute.use(express.json());

placeRoute.get('/read',authenticateUser ,async (req, res) => {
    try {
        const data = await Place.find({users:req.user.id});
        res.status(200).send({ msg: "Data received", data });
    } catch (error) {
        console.error("Error fetching place data", error);
        res.status(500).json({ errMsg: "Invalid get request", error });
    }
});

placeRoute.post('/create', authenticateUser, async (req, res) => {
    try {
        console.log('RequestBody',req.body);
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }

        // const newPlaceData = await Place.create(req.body);
        const newPlaceData=new Place({
            ...req.body,
            users:user._id
        })
        await newPlaceData.save();
        user.places.push(newPlaceData._id); 
        await user.save();

        res.status(201).json({ message: "Place data created successfully", newPlaceData });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: "Invalid data provided", details: error.errors });
        } else {
            console.error("Error creating place data", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
});

// Delete a place
placeRoute.delete('/delete/:id',authenticateUser ,async (req, res) => {
    try {
        const deletedPlace = await Place.findByIdAndDelete(req.params.id);
        if (!deletedPlace) {
            return res.status(404).json({ error: "Place not found" });
        }
        res.status(200).json({ message: "Place deleted successfully", deletedPlace });
    } catch (error) {
        console.error("Error deleting place", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update a place
placeRoute.put('/update/:id', authenticateUser, async (req, res) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlace) {
            return res.status(404).json({ error: "Place not found" });
        }
        res.status(200).json({ message: "Place updated successfully", updatedPlace });
    } catch (error) {
        console.error("Error updating place", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = placeRoute;
