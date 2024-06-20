import React, { useState } from 'react';
import './Signin.css';
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignOut,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext/index";
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

export default function Signin() {
  const { userLoggedIn, setUserLogIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
        setIsSigningIn(true);
        try {
            console.log("Attempting to sign in with email and password...");
            await doSignInWithEmailAndPassword(email, password);
            console.log("Signed in successfully, sending login request to server...");
            const response = await axios.post('http://localhost:4001/users/signin', {
                email,
                password
            });
            console.log("Server response:", response.data);
            setErrorMessage(''); // Clear the error message on successful login
            setSuccessMessage('Login successful!');
            setUserLogIn(true);
            toast.success('Login successful!');
            navigate('/main');
        } catch (error) {
            console.error('Error logging in:', error);
            console.log('Error response:', error.response);
            setErrorMessage(error.response?.data?.message || 'Error logging in');
            setSuccessMessage('');
            toast.error('Error logging in: ' + (error.response?.data?.message || 'Error logging in'));
        } finally {
            setIsSigningIn(false);
        }
    }
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  const handleLogout = async () => {
    await doSignOut();
    localStorage.removeItem("token");
    setUserLogIn(false);
    toast.success('Logged out successfully!');
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
        setIsSigningIn(true);
        try {
            console.log("Attempting to sign in with Google...");
            await doSignInWithGoogle();
            console.log("Signed in with Google successfully!");
            setUserLogIn(true);
            toast.success('Signed in with Google successfully!');
            navigate('/main'); // Redirect to the main page
        } catch (error) {
            setErrorMessage('Error logging in with Google');
            console.error('Error logging in with Google:', error);
            toast.error('Error logging in with Google');
        } finally {
            setIsSigningIn(false);
        }
    }
};


  return (
    <div>
      <div className='main_signin'>
        {userLoggedIn && <Navigate to={"/main"} replace={true} />}
        <div className="container_signin">
          <div className="image-container_signin">
            <img className="image_signin" src="../assets/imageforlogin.png" alt="Sign In" />
          </div>
          <div className="form-container_signin">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <h2 className='singin'>Sign In</h2>
            <form onSubmit={handleSignin}>
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
              {userLoggedIn ? (
                <button type="button" className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <button type="submit" className="button_signin">Signin</button>
                  <button type="button" className="create-account-button" onClick={handleCreateAccount}> create an account</button>
                  <button type="button" className="login-button-google" onClick={onGoogleSignIn}>Login with Google</button>
                </>
              )}
            </form>
            <p>Don't have an account? <a href="/signup" className="link_signin">Sign Up</a></p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}