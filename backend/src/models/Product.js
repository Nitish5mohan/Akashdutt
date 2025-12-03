const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Enterprise', 'Consumer', 'Component'],
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    specs: Object,
    images: [String],
    stock: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
