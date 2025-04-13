// routes/messages.js

const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/:bookingId", async (req, res) => {
  try {
    const messages = await Message.find({ bookingId: req.params.bookingId }).sort("timestamp");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/chat
router.post('/', async (req, res) => {
  const { bookingId, sender, content } = req.body;

  if (!bookingId || !sender || !content) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const newMessage = new Message({ bookingId, sender, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ message: "Server error while saving message" });
  }
});

module.exports = router;
