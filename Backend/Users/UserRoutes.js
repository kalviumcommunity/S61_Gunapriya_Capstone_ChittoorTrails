const express = require('express');
const Joi = require('joi');
const User = require('../Users/UserSchema'); 
const bcrypt = require('bcryptjs');
const UserRoute = express.Router();

UserRoute.use(express.json());

const createUserSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

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
    const { error } = createUserSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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

UserRoute.post('/signin', async (req, res) => {
    try {
        const { error } = signinSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(400).json({ message: error.message });
    }
});

UserRoute.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password }, { new: true });
        res.status(200).send({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).json({ errMsg: "Error updating user", error });
    }
});

module.exports = UserRoute;