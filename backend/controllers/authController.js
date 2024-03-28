const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Controller function to handle user login
const loginUser = async (req, res, next) => {
  console.log('loginUser:', req.body); // Logging request body
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    // If user is not found or password does not match, return error
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      console.log('Invalid email or password');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token in response
    console.log('User logged in successfully');
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// Controller function to handle user signup
const signupUser = async (req, res, next) => {
  console.log('signupUser:', req.body); // Logging request body
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email is already registered');
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token in response
    console.log('User signed up successfully');
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

// Export the login and signup routes
router.post('/login', loginUser);
router.post('/signup', signupUser);

module.exports = router;
