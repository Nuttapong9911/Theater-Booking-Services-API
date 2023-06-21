const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    _userID: {type: String, unique: false},
    reference_code: {type: ObjectId, unique: true},
    status: {type:String},
    _showID: {type: String, unique: false},
    seat_type: {type:String},
    row: {type: String},
    column: {type: String},
    paid_date: {type: Date}
})

module.exports = mongoose.model('ticket', ticketSchema)