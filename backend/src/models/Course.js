const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional']
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    syllabus: [String],
    capacity: {
        type: Number,
        default: 30
    },
    enrolled: {
        type: Number,
        default: 0
    },
    startDate: Date,
    instructor: String,
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
