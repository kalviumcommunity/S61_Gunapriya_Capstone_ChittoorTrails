import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await doCreateUserWithEmailAndPassword(email, password);
        const firebaseUser = userCredential.user;
        const response = await axios.post('https://capstone-chittoortrails.onrender.com/users/create', {
            username,
            email,
            password
        });

        console.log("Backend response:", response.data);
        localStorage.setItem("token",response.data.token)
        setErrorMessage('');
        setSuccessMessage('User created successfully!');
        toast.success('User created successfully!');
        setTimeout(() => {
          navigate('/main');
        }, 2000);
    } catch (error) {
        console.error('Error signing up:', error);
        setErrorMessage(error.response?.data?.message || 'Error signing up');
        setSuccessMessage('');
        toast.error('Error signing up: ' + (error.response?.data?.message || 'Error signing up'));
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
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
      <ToastContainer />
    </div>
  );
}