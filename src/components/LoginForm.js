import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css';

function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 30
      });
      
      console.log('Login successful:', response.data);
      alert('Login successful!');
      // Store token in localStorage or context
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h1>Anywhere app.</h1>
      <h2>Home</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="login-btn">Log In</button>
      </form>
      
      <p>Don't have an account? <a href="/signup">Join</a></p>
      <button className="start-free-btn">START FOR FREE</button>
    </div>
  );
}

export default LoginForm;