const express = require('express');
const Joi = require('joi');
const User = require('../Users/UserSchema'); // Adjust path as per your project structure
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const UserRoute = express.Router();
UserRoute.use(express.json());
UserRoute.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Change to your frontend URL
    credentials: true,
};
UserRoute.use(cors(corsOptions));

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
    const { username, email, password } = req.body;

    // Validate the request body
    const { error } = createUserSchema.validate({ username, email, password });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new user instance
        const newUser = new User({ username, email, password });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // Save the new user
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            secure: process.env.NODE_ENV === 'production' // Set secure=true in production
        });

        // Debug: Log token and cookies
        console.log('Token set in cookie:', token);
        console.log('Cookies:', res.getHeader('Set-Cookie'));

        // Respond with success message and token
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error("Error during sign-up:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

UserRoute.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Validate the request body
    const { error } = signinSchema.validate({ email, password });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            secure: process.env.NODE_ENV === 'production' 
        });

        // Debug: Log token and cookies
        console.log('Token set in cookie:', token);
        console.log('Cookies:', res.getHeader('Set-Cookie'));

        // Respond with success message and token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Server Error' });
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
