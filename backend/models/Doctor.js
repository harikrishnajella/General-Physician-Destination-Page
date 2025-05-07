const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: Number,
  rating: Number,
  consultationFee: Number,
  location: String
});

module.exports = mongoose.model('Doctor', doctorSchema);
