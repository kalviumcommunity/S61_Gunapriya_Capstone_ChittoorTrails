const express = require('express');
const { Place } = require('./Schema');
const placeRoute = express.Router();

placeRoute.use(express.json());

// Get all places
placeRoute.get('/read', async (req, res) => {
    try {
        const data = await Place.find();
        res.status(200).send({ msg: "Data received", data });
    } catch (error) {
        console.error("Error fetching place data", error);
        res.status(500).json({ errMsg: "Invalid get request", error });
    }
});

// Create a new place
placeRoute.post('/create', async (req, res) => {
    try {
        const newPlaceData = await Place.create(req.body);
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
placeRoute.delete('/delete/:id', async (req, res) => {
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
placeRoute.put('/update/:id', async (req, res) => {
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
