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

module.exports = UserRoute;