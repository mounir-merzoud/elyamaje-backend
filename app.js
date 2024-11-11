require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

// Connexion à MongoDB sans options obsolètes
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/admin', adminRoutes);
app.use('/employee', authMiddleware, employeeRoutes);

module.exports = app;
