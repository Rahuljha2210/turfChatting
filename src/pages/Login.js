import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', form.email); // storing user email
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Invalid login");
    }
  };
  

  return (
    <div class="login_container" id="login_container">
        <div class="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
          </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel">
                    <h1>Hello, Friend!</h1>
                    <p>Welcome to our turf login</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;
