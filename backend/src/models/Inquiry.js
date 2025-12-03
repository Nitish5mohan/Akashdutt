const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    droneType: {
        type: String,
        required: true,
        enum: ['surveillance', 'delivery', 'agriculture', 'inspection', 'other']
    },
    purpose: String,
    budget: String,
    timeline: String,
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Inquiry', inquirySchema);
