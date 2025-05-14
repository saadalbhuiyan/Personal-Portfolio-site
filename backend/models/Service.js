const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String, // Path to compressed image (e.g., '/uploads/compressed/service-123.jpg')
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    fullDescription: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);