import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);

    // Simulate successful sign-up and navigate to the main page
    navigate('/main'); // Replace '/mainpage' with the route to your main page
  };

  return (
    <div>
      <div className="signup-main">
        <div className="signup-container">
          <div className="signup-image-container">
            <img className="signup-image" src="../assets/Sinupimage.png" alt="Sign Up" />
          </div>
          <div className="signup-form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="signup-form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="signup-form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="signup-form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="signup-button">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/signin" className="signup-link">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
