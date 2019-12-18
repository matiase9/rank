const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    city: String,
    state: String,
    country: String,
    lat: Number,
    long: Number
});

module.exports = mongoose.model('Place', placeSchema);