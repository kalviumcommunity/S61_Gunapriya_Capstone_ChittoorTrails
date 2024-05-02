const express = require('express');
const { Place } = require('../Schema');
const { Router } = require('express');
const placeRoute = express.Router();

placeRoute.use(express.json());

placeRoute.get('/read', async (req, res) => {
    try {
        const data = await Place.find();
        res.status(200).send({ msg: "Data received", data });
    } catch (error) {
        console.error("Error fetching place data", error);
        res.status(500).json({ errMsg: "Invalid get request", error });
    }
});

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

module.exports = placeRoute;
