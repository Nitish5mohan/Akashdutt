const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    droneType: {
        type: String,
        required: true,
        enum: ['photography', 'inspection', 'delivery', 'surveillance']
    },
    location: {
        type: String,
        required: true
    },
    pilot: {
        type: Boolean,
        default: false
    },
    userEmail: String,
    userName: String,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    totalCost: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
