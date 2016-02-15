var mongoose = require('mongoose');

var donorScheme = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    bloodType: String,
    ip: String,
    location: [Number]
});

module.exports = mongoose.model('Donor', donorScheme);
