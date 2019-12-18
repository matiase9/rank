const mongoose = require('mongoose');

const beerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    alc: Number,
    ibu: Number
    // categoryId: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Category'
    //     }
    // ]

});

module.exports = mongoose.model('Beer', beerSchema);