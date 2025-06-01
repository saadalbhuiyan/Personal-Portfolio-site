const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true,
            trim: true,
        },
        compressedPath: {
            type: String,
            required: true,
            trim: true,
        },
        contentType: {
            type: String,
            required: true,
            trim: true,
        },
        size: {
            type: Number,
            required: true,
        },
        associatedCollection: {
            type: String,
            required: true,
            trim: true,
        },
        associatedId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'associatedCollection',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Image', imageSchema);
