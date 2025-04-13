import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <>
    <div class="register_container" id="login_container">
        <div class="form-container sign-up">
        <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
        </div>
        <div class="toggle-container">
            <div class="register_toggle">
                <div class="toggle-panel">
                    <h1>Hello, Friend!</h1>
                    <p>Welcome to our turf</p>
                </div>
            </div>
        </div>
    </div>
    </>
    
  );
}

export default Register;
