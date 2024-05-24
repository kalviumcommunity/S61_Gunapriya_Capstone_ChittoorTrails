import React, { useState } from 'react';
import "./Signup.css"

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
      <div>
        <h1 className='logo_name_singup'>Chittoor Trail</h1>
    <div className="signup-container"> 
     
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
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/signin">Sign In</a></p>
      </div>
      <div className="signup-image-container"> 
        <img className="signup-image" src="../src/assets/Sinupimage.png" alt="Sign Up" /> 
      </div>
    </div>
    </div>
  );
}
