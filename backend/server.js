const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const Booking = require("./models/BookingSchema");

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/chat/",require("./routes/messages"));

// GET bookings - optionally filtered by email
// app.get("/", async (req, res) => {
//   try {
//     const { email } = req.query;

//     let bookings;

//     if (email) {
//       console.log("Fetching bookings for email:", email); // 🔍 log email
//       bookings = await Booking.find({ email });
//     } else {
//       bookings = await Booking.find();
//     }

//     res.json(bookings);
//   } catch (err) {
//     console.error("Error fetching bookings:", err);
//     res.status(500).json({ error: err.message });
//   }
// });


app.get("/api/requests", async (req, res) => {
  const { email } = req.query;
  const requests = await Booking.find({ requestedBy: email });
  res.json(requests);
});


// DB + Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}).catch((err) => console.error("Mongo error:", err));
