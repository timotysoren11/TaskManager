// Importing required modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importing models
const User = require('../models/User');

// User registration
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validating the input fields
        if (!username || !email || !password ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // checking if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Checking if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        };

        // Saving the new user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });  
    }
};

// user login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validation
        if(!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // checking if th user exists or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Comparing the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generating a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ 
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            } 
        });

    } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
        message: error.message
    });
}
};

// controller for user logout
exports.logout = (req, res) => {
    return res.status(200).json({ message: 'Logged out successfully' });    
}
