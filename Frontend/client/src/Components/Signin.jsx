import React, { useState } from 'react';
import './Signin.css';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle sign in logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className='main_singin'>
     
      <h1 className='logo_name'>Chittoor Trail</h1>
  
 
    <div className="container">
      <div className="image-container">
        <img className="image_singin" src="../src/assets/imageforlogin.png" alt="Sign In" />
      </div>
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
    </div>
  );
}
