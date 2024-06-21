const express = require("express");
const Joi = require("joi");
const User = require("./UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const UserRoute = express.Router();
UserRoute.use(express.json());
UserRoute.use(cookieParser());

const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

UserRoute.post("/create", async (req, res) => {
  const { username, email, password } = req.body;

  const { error } = createUserSchema.validate({ username, email, password });
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message, success: false });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });

    console.log("Token set in cookie:", token);
    console.log("Cookies:", res.getHeader("Set-Cookie"));

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// UserRoute.post("/signin", async (req, res) => {
//   const { email, password } = req.body;

//   // Validate request body
//   const { error } = signinSchema.validate({ email, password });
//   if (error) {
//     console.log("Validation error:", error.details[0].message); // Log validation errors
//     res.status(400).json({ message: error.details[0].message, success: false });
//   }

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found:", email); // Log when user is not found
//       res.status(404).json({ message: "User not found" });
//     }

//     //   res.send({user, inputDAta: req.body})

//     bcrypt.compare(password, user.password).then(function (result) {
//       if (result) {
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//           expiresIn: "7d",
//         });
//         res.cookie("token", token, {
//           httpOnly: true,
//           maxAge: 7 * 24 * 60 * 60 * 1000, 
//           secure: process.env.NODE_ENV === "production",
//         });
//         res.status(200).json({ message: 'Login successful', token, success:true });
//       }else{
//         res.status(400).send({msg: "Invalid credentials", success: false})
//       }
//     });

//     // Compare passwords
//     //   console.log(password)
//     //   const isMatch = await bcrypt.compare(password, user.password);
//     //   if (!isMatch) {
//     //     console.log("Invalid credentials for user:", email, isMatch); // Log invalid credentials
//     //      res.status(401).json({ message: 'Invalid credentials', success: false });
//     //   }

//     //   // Generate JWT token
//     //   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//     //   // Set cookie with token
//     //   res.cookie('token', token, {
//     //     httpOnly: true,
//     //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
//     //     secure: process.env.NODE_ENV === 'production'
//     //   });

//     //   console.log('Token set in cookie:', token);
//     //   console.log('Cookies:', res.getHeader('Set-Cookie'));

//     //   // Respond with success message and token
//     //   res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });



UserRoute.put("/update/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ errMsg: "Error updating user", error });
  }
});

module.exports = UserRoute;
