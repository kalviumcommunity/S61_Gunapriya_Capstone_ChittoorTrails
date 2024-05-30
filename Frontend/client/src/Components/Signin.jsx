import React, { useState } from 'react';
import './Signin.css';
import { Link } from 'react-router-dom';


export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      
      <div className='main_signin'>
        <div className="container_signin">
          <div className="image-container_signin">
            <img className="image_signin" src="../assets/imageforlogin.png" alt="Sign In" />
          </div>
          <div className="form-container_signin">
            <h2 className='singin'>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group_signin">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group_signin">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Link to='/main'><button type="submit" className="button_signin">Sign In</button></Link>
              
            </form>
            <p>Don't have an account? <a href="/signup" className="link_signin">Sign Up</a></p>
          </div>
        </div>
      </div>
    
    </div>
  );
}
