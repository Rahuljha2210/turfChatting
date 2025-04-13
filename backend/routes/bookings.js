const express = require("express");
const router = express.Router();
const Booking = require("../models/BookingSchema");

router.post("/", async (req, res) => {
  try {
    const {
      turfId,
      turfName,
      time,
      date,
      price,
      membersExisting,
      membersNeeded,
      email 
    } = req.body;

    const booking = new Booking({
      turfId,
      turfName,
      time,
      date,
      price,
      membersPresent: membersExisting,
      membersNeeded,
      email 
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { email } = req.query;

    let bookings;
    if (email) {
      bookings = await Booking.find({ email });
    } else {
      bookings = await Booking.find(); // optional: restrict if no email provided
    }

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allBookings = await Booking.find();
    res.json(allBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
