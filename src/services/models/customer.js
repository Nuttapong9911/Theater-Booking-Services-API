const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstname: {type: String, default: null},
    lastname: {type: String, default: null},
    email: {type: String, unique: true},
    password: {type: String},
    account: {type: Number, default: 20000 }
})

module.exports = mongoose.model('customer', customerSchema)