const Booking = require('../models/booking');
const Event = require('../models/Event');

exports.createBooking = async (req, res) => {
  try {
    const { event, quantity } = req.body;
    const user = req.user._id;

    const foundEvent = await Event.findById(event);
    if (!foundEvent) return res.status(404).json({ message: 'Event not found' });

    if (foundEvent.bookedSeats + quantity > foundEvent.seatCapacity) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Update booked seats
    foundEvent.bookedSeats += quantity;
    await foundEvent.save();

    const booking = new Booking({
      user,
      event,
      quantity,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('event');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
