const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController'); // Correct the import here
const { protect } = require('../middleware/authMiddleware');

// Create a new booking (protected route)
router.post('/', protect, createBooking);

// Get all bookings for the current user (protected route)
router.get('/', protect, getUserBookings);  // Make sure it's getUserBookings instead of getBookings

module.exports = router;
