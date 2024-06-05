import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send user data to server for registration
      const response = await axios.post('http://localhost:4001/users/create', {
        username,
        email,
        password
      });
      console.log('Response:', response.data);
      navigate('/main'); // Redirect to the main page upon successful registration
    } catch (error) {
      console.error('Error:', error.response.data);
      alert(error.response.data);
    }
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
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
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
              <button type="submit" className="signup-button">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/signin" className="signup-link">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
