require('dotenv').config({ path: '.env.example' });
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/error');

const authRoutes = require('./routes/authRoutes');
const dreamRoutes = require('./routes/dreamRoutes');

const app = express();

// Connect DB
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter); // Apply rate limiter to all API routes

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dreams', dreamRoutes);

// Global Error Handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
