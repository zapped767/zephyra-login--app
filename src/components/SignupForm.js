import React, { useState } from 'react';
import '../styles/SignupForm.css';

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Signup data:', formData);
      alert('Signup successful! Please login.');
      window.location.href = '/login';
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      {/* Header Navigation */}
      <div className="header-nav">
        <div className="logo">
          Anywhere app.
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/login">Join</a>
        </div>
      </div>

      {/* Form Section */}
      <div className="form-container">
        <div className="start-text">START FOR FREE</div>
        <h2>Create new account.</h2>
        <p className="login-link">Already A Member? <a href="/login">Log In</a></p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Michal"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Masiak"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="michal.masiak@anywhere.co"
              required
            />
          </div>
          
          <div className="form-group password-field">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          
          <div className="form-actions">
            <a href="#" className="change-method">Change method</a>
            <button type="submit" className="create-account-btn">
              Create account
            </button>
          </div>
        </form>
      </div>

      {/* Image Section */}
      <div className="image-section">
        <div className="bottom-logo"></div>
      </div>
    </div>
  );
}

export default SignupForm;