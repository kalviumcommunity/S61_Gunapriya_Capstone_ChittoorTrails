const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Hill', 'Waterfall', 'Hotel', 'Fort', 'Temple', 'Forest', 'Others'],
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = { Place };
