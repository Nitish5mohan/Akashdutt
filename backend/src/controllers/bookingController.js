const Booking = require('../models/Booking');

// @desc    Create booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res) => {
    try {
        const { date, time, droneType, location, pilot, userEmail, userName } = req.body;

        // Calculate cost (base rate + pilot fee)
        const baseRate = 100; // $100/hour
        const pilotFee = pilot ? 50 : 0;
        const totalCost = baseRate + pilotFee;

        const booking = await Booking.create({
            date,
            time,
            droneType,
            location,
            pilot,
            userEmail,
            userName,
            totalCost
        });

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private (Admin)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Public
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private (Admin)
exports.updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
