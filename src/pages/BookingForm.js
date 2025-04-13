import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingForm = () => {
  const { turfId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    turfName: "",
    date: "",
    time: "",
    price: "",
    membersExisting: "",
    membersNeeded: "",
  });

  const email = localStorage.getItem("email");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        turfId,
        ...form,
        email,
      });
      navigate("/requests");
    } catch (err) {
      console.error("Booking error", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Booking for Turf ID: {turfId}</h2>

      <input
        type="text"
        name="turfName"
        placeholder="Turf Name"
        value={form.turfName}
        onChange={handleChange}
        required
        style={{ margin: "10px 0", width: "100%", padding: "8px" }}
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        style={{ margin: "10px 0", width: "100%", padding: "8px" }}
      />

      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
        required
        style={{ margin: "10px 0", width: "100%", padding: "8px" }}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
        style={{ margin: "10px 0", width: "100%", padding: "8px" }}
      />

      <input
        type="number"
        name="membersExisting"
        placeholder="Members Existing"
        value={form.membersExisting}
        onChange={handleChange}
        required
        style={{ margin: "10px 0", width: "100%", padding: "8px" }}
      />

      <input
        type="number"
        name="membersNeeded"
        placeholder="Members Needed"
        value={form.membersNeeded}
        onChange={handleChange}
        required
        style={{ margin: "10px 0", width: "100%", padding: "8px" }}
      />

      <button type="submit" style={{ padding: "10px", width: "100%", backgroundColor: "#28a745", color: "white", border: "none" }}>
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
