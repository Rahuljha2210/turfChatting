const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  turfName: String,
  location: String,
  date: String,
  time: String,
  price: Number,
  membersPresent: Number,
  membersNeeded: Number,
  email: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
