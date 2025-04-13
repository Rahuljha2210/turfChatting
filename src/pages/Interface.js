import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/interface.css';
import BookingsList from "./BookingList";

const Interface = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);


  

  const turfs = [
    { id: "Green Arena", name: "Green Arena", location: "Anna Nagar", price: 500 },
    { id: "turf2", name: "ProPlay Turf", location: "T Nagar", price: 600 },
    { id: "turf3", name: "Footy Field", location: "Velachery", price: 450 },
    { id: "turf4", name: "StadiumX", location: "Kodambakkam", price: 700 },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/requests?email=${email}`);
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };

    if (email) {
      fetchRequests();
    }
  }, [email]);


  return (
    <>
      <div className="parent">
        <div id="user_data" hidden></div>
        <div className="interface">
          <section id="p_page">
            <div className="inner_thing">
              <header>
                <div className="inner_head">
                  <div className="logo">
                    <div id="toggle">
                      <img src="/icons/bars-solid.svg" alt="Menu" />
                    </div>
                    <h2>Turfee</h2>
                    <h1>Welcome, {email}</h1>
                  </div>
                  <nav>
                    <div className="nav1"><a href="">Info</a></div>
                    <div className="nav2"><a href="">About</a></div>
                    <div className="nav3">
                      <a href="#" style={{ textDecoration: "none" }} onClick={() => navigate("/login")}>
                        Log in
                      </a>
                    </div>
                  </nav>
                </div>
              </header>
              <div className="sec1">
                <input type="text" placeholder="Search" />
              </div>
            </div>
          </section>

          <section id="function">
            <div className="sec1" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>Turfs</h2>
              <button
                onClick={() => navigate("/requests")}
                style={{
                  padding: "6px 12px",
                  cursor: "pointer",
                  backgroundColor: "#1e90ff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px"
                }}
              >
                View Requests
              </button>
            </div>
          </section>

          {/* Turf Cards */}
          <div className="turf-list">
            {turfs.map((turf) => (
              <div key={turf.id} className="turf-card">
                <h2>{turf.name}</h2>
                <p><strong>Location:</strong> {turf.location}</p>
                <p><strong>Price:</strong> ₹{turf.price}</p>
                <button onClick={() => navigate(`/book/${turf.id}`)}>Book Turf</button>
              </div>
            ))}
          </div>

{/*         
          <section style={{ marginTop: "40px", padding: "20px" }}>
            <h2>Your Requests</h2>
            {requests.length === 0 ? (
              <p>No requests found.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {requests.map((req) => (
                  <li key={req._id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}>
                    <strong>Turf:</strong> {req.date} <br />
                    <strong>To:</strong> {req.time} <br />
                    <strong>Status:</strong> {req.price}
                  </li>
                ))}
              </ul>
            )}
          </section> */}
          <BookingsList />

        </div>
      </div>
    </>
  );
};

export default Interface;
