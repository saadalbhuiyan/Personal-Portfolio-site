const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true
        },
        compressedPath: {
            type: String,
            required: true
        },
        contentType: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        associatedCollection: {
            type: String,
            required: true
        },
        associatedId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Image', imageSchema);
