const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    _movieID: {type: String, unique: false},
    datetime_start: {type: Date},
    datetime_end: {type: Date},
    _theaterID: {type: String, unique: false}
})

module.exports = mongoose.model('showtime', showtimeSchema)