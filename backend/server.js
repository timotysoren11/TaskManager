
require('dotenv').config();

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Importing Database Connection
const connectDB = require('./config/db');

// Importing Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

