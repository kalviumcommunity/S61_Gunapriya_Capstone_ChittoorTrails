const express = require('express');
const User = require('../Users/UserSchema');
const UserRoute = express.Router();

UserRoute.use(express.json());

UserRoute.get('/get', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ message: "Users data received", users });
    } catch (error) {
        console.error("Error fetching users data", error);
        res.status(500).json({ errMsg: "Invalid get request", error });
    }
});

UserRoute.post('/create', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
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

UserRoute.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { username, password }, { new: true });
        res.status(200).send({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).json({ errMsg: "Error updating user", error });
    }
});

module.exports = UserRoute;