const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String, // Path to compressed image (e.g., '/uploads/compressed/testimonial-123.jpg')
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Testimonial', testimonialSchema);