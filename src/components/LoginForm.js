import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css';

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('Request sent:', config);
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Pre-fill with dummy credentials for testing
  useEffect(() => {
    setCredentials({
      username: 'emilys',
      password: 'emilyspass'
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiClient.post('/auth/login', {
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 30
      });
      
      console.log('Login successful:', response.data);
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      setSuccess('Login successful! Redirecting...');
      
      // Redirect after success message
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response?.status === 400) {
        setError('Invalid credentials. Please check your username and password.');
      } else if (error.code === 'ECONNABORTED') {
        setError('Request timeout. Please try again.');
      } else {
        setError('Login failed. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartFree = () => {
    window.location.href = '/signup';
  };

  return (
    <div className="login-page-container">
      {/* Header Navigation */}
      <div className="login-header-nav">
        <div className="login-logo">
          Anywhere app.
        </div>
        <div className="login-nav-links">
          <a href="/" className="active">Home</a>
          <a href="/signup">Join</a>
        </div>
      </div>

      {/* Image Section with Logo */}
      <div className="login-bottom-logo"></div>

      {/* Form Section */}
      <div className="login-form-container">
        <div className="login-welcome-back">WELCOME BACK</div>
        <h2 className="login-main-heading">Log into your account</h2>
        <p className="login-subtitle">
          Don't have an account? <a href="/signup">Sign up for free</a>
        </p>
        
        {error && <div className="login-error-message">{error}</div>}
        {success && <div className="login-success-message">{success}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="login-form-group login-password-field">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
            <button 
              type="button" 
              className="login-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          
          <div className="login-form-actions">
            <a href="/forgot-password" className="login-forgot-password">
              Forgot password?
            </a>
            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading && <span className="login-loading-spinner"></span>}
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </form>
        
        <div className="login-start-free-section">
          <p className="login-start-free-text">New to our platform?</p>
          <button 
            className="login-start-free-btn" 
            onClick={handleStartFree}
            disabled={isLoading}
          >
            START FOR FREE
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;