import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./NavBar.css";

export default function NavBar() {
  const location = useLocation();
  
  return (
    <div className='main_navbar'>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to='/'><img className="logo_home" src="../assets/logo.png" alt="Logo" /></Link>
          
          <div className="nav-links">
            <Link to="/about">About</Link>
            {location.pathname !== '/main' && location.pathname!=='/profile' && location.pathname!=='/addpost' && location.pathname!=='/editpost' && location.pathname!='/logout' &&(
              <>
                <Link to="/signup">Sign Up</Link>
                <Link to="/signin">Sign In</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
