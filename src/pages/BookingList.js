import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  console.log("User Email:", email);  

  useEffect(() => {
    if (!email) return;

    axios
      .get(`http://localhost:5000/api/bookings?email=${email}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  const handleChat = (bookingId) => {
    console.log(bookingId);
    navigate(`/chat/${bookingId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Booking Requests</h2>
      <div className="booking-cards">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking, index) => (
            <div key={index} className="turf-card">
              <h3>{booking.turfId}</h3>
              <p><strong>Turf Name:</strong>{booking.turfName}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Price:</strong> ₹{booking.price}</p>
              <p><strong>Members:</strong> {booking.membersExisting} + looking for {booking.membersNeeded}</p>
              <button onClick={() => handleChat(booking._id)}>Chat</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests;
