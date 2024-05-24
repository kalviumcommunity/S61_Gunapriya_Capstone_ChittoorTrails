import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../src/assets/logo.png";
import './NavBar.css';
// import About from "./About";

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          <img src={logo} className="nav__logo"/>
        </NavLink>

        <div className={"nav__menu"} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/About" className="nav__link">
                About
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/signin" className="nav__link">
                Sign In
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/signup" className="nav__link">
                Sign Up
              </NavLink>
            </li>
          </ul>    
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
