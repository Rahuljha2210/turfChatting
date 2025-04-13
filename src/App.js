
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Interface from './pages/Interface';
import BookingForm from "./pages/BookingForm";
import Requests from "./pages/Request";
import Chat from './pages/Chat';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Interface />} />
        <Route path="/book/:turfId" element={<BookingForm />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/chat/:bookingId" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
