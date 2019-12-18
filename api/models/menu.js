const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    city: String,
    state: String,
    country: String
    // categoryId: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Category'
    //     }
    // ]

});

module.exports = mongoose.model('Menu', beerSchema);