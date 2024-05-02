const express = require('express');
const UserModel = require('../UserSchema');
const userRoute = express.Router();

userRoute.use(express.json());

userRoute.get('/read', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send({ message: "Users data received", users });
    } catch (error) {
        console.error("Error fetching users data", error);
        res.status(500).json({ errMsg: "Invalid get request", error });
    }
});

userRoute.post('/create', async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: "Invalid data provided", details: error.errors });
        } else {
            console.error("Error creating user", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
});

module.exports = userRoute;
