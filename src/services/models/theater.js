const mongoose = require('mongoose');

const seat = new mongoose.Schema({
    seat_type: {type:String},
    price: {type: Number},
    rows: [{type: String}],
    column: [{type: String}]
}, 
{_id: false})

const theaterSchema = new mongoose.Schema({
    theater_name: {type: String},
    description: {type: String, default: 'default theater description'},
    seats: [seat]
})

module.exports = mongoose.model('theater', theaterSchema)