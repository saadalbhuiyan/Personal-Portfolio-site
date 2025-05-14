const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true,
    },
    compressedPath: {
        type: String, // Path to compressed image (e.g., '/uploads/compressed/image-123.jpg')
        required: true,
    },
    contentType: {
        type: String, // e.g., 'image/jpeg' or 'image/webp'
        required: true,
    },
    size: {
        type: Number, // Size in bytes
        required: true,
    },
    associatedCollection: {
        type: String, // e.g., 'projects', 'blogs', 'services', 'testimonials'
        required: true,
    },
    associatedId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the associated document
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Image', imageSchema);