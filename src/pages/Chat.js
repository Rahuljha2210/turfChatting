import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Chat = () => {


  const { bookingId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const currentUserEmail = localStorage.getItem("email");

  useEffect(() => {
    fetchMessages();
  }, [bookingId]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/${bookingId}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/chat", {
        bookingId,
        sender: currentUserEmail,
        content: newMsg
      });
      setNewMsg("");
      fetchMessages(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Chat for Booking: {bookingId}</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "10px",
          backgroundColor: "#f9f9f9"
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === currentUserEmail ? "right" : "left",
              margin: "10px 0"
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: msg.sender === currentUserEmail ? "#d1e7dd" : "#f8d7da"
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          style={{ flexGrow: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 15px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
