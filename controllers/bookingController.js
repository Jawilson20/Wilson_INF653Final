const Booking = require('../models/booking');
const Event = require('../models/Event');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { event, quantity } = req.body;
    const user = req.user._id;

    const selectedEvent = await Event.findById(event);
    if (!selectedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (selectedEvent.bookedSeats + quantity > selectedEvent.seatCapacity) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = new Booking({
      user,
      event,
      quantity
    });

    await booking.save();

    // Update booked seats count
    selectedEvent.bookedSeats += quantity;
    await selectedEvent.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings (admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('event');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get bookings for current user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
