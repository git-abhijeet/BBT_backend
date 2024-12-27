const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const videoRoutes = require('./routes/videoRoute');
const multer = require('multer');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', videoRoutes);

// Error-handling middleware for Multer errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.log("🚀 ~ app.use ~ err:", err)
        // Handle Multer-specific errors
        return res.status(400).json({ message: err.message });
    } else if (err) {
        // Handle other errors
        return res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
    }
    next();
});

module.exports = app;
