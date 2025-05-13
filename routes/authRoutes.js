console.log('authRoutes.js loaded'); // Log when this file is loaded

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Log when a request hits the /register route
router.post('/register', (req, res, next) => {
  console.log('Register route hit'); // Log request to register route
  next(); //  next middleware (register controller)
}, register);

// Log when a request hits the /login route
router.post('/login', (req, res, next) => {
  console.log('Login route hit'); // Log request to login route
  next(); // next middleware (login controller)
}, login);

module.exports = router;
