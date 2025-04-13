import React, { useState } from "react";
import axios from "axios";

const TurfForm = () => {
  const [turf, setTurf] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTurf({ ...turf, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/turfs", turf);
      setMessage(response.data.message);
      setTurf({ name: "", description: "", location: "", price: "" });
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add a Turf</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Turf Name" value={turf.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={turf.description} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={turf.location} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={turf.price} onChange={handleChange} required />
        <button type="submit">Add Turf</button>
      </form>
    </div>
  );
};

// Simple CSS styles
const styles = {
  container: { maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  message: { color: "green" },
};

export default TurfForm;
