const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {type: String},
    genre: [{type: String}],
    status: {type:String, default: "ACTIVE"},
    duration: {type: Number, default: 120},
    description: {type: String, default: "description text"},
    image: {type: String}
})

module.exports = mongoose.model('movie', movieSchema)