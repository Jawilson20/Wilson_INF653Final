const express = require('express');
const Event = require('../models/Event');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post('/', protect, admin, async (req, res) => {
  const { title, description, category, venue, date, time, seatCapacity, price } = req.body;

  const newEvent = new Event({
    title,
    description,
    category,
    venue,
    date,
    time,
    seatCapacity,
    price,
  });

  await newEvent.save();
  res.status(201).json(newEvent);
});

module.exports = router;
