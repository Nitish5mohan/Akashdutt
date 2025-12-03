const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.route('/')
    .post(protect, createBooking)
    .get(getAllBookings);

router.route('/:id').put(protect, updateBookingStatus);

module.exports = router;
