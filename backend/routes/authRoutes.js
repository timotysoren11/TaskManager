const express = require('express');
const router = express.Router();

// Importing the auth controller
const { 
    register, 
    login, 
    logout } = require('../controllers/authController');

// Route for user registration and Login/logout
router.post('/register',register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;