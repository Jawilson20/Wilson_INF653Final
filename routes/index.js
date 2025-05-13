const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const eventRoutes = require('./eventRoutes');
const bookingRoutes = require('./bookingRoutes');

router.get('/', (req, res) => {
  res.json({ message: 'API Root - /api' });
});

router.use('/auth', authRoutes);         // /api/auth
router.use('/events', eventRoutes);      // /api/events
router.use('/bookings', bookingRoutes);  // /api/bookings

module.exports = router;
