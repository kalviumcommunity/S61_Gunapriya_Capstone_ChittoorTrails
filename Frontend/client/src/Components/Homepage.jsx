import React from 'react';
import './Homepage.css';
import { useState ,useEffect} from 'react';
import axios from "axios";

export default function Homepage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:4001/api/read')
        .then(response => {
          console.log(response.data);
          setPlaces(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching places:', error);
        });
    }, []);
  return (
    <>
         <div className='main_container'>
        <img className='image' src="../src/assets/valley-4646114_1280.jpg" alt="Chittoor Valley" />
      </div>
      <div className='Main_heading'>
        <p className='explore_heading'>Explore Beautiful</p>
        <p className='chittoor_heading'>Chittoor</p>
      </div>
      <nav className="navbar">
        <div className="navbar-container">
          <img className="logo_home" src="../src/assets/logo.png" alt="Logo" />
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#signup">Sign Up</a>
            <a href="#signin">Sign In</a>
          </div>
        </div>
      </nav>
      <div>
      <h1>All Places</h1>
      <ul>
        {places.map(place => (
          <div key={place._id} className="place-info">
            <h2>{place.name}</h2>
            <p>Location: {place.location}</p>
            <p>Description: {place.description}</p>
            <p>Type: {place.type}</p>
            <p>Ratings: {place.ratings}</p>
            <img src={place.imageUrl} alt={place.name} className="place-image" />
            {/* <p>Opening Hours: {place.openingHours}</p> */}
          </div>
        ))}
       </ul>
      </div>
      <div>
      <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Explore</h2>
          <ul>
            <li>Hills</li>
            <li>Waterfalls</li>
            <li>Hotels</li>
            <li>Forts</li>
            <li>Temples</li>
            <li>Forests</li>
            <li>Others</li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a><img  className="socialmedia_icon"src="..\src\assets\facebook.png" alt="" /><i className="fab fa-facebook-f"></i></a>
            <a><img className='socialmedia_icon' src="../src/assets/twitter.png" alt="" /><i className="fab fa-twitter"></i></a>
            <a><img className='socialmedia_icon' src="../src/assets/instagram.png" alt="" /><i className="fab fa-instagram"></i></a>
            <a><img  className="socialmedia_icon"src="../src/assets/linkedin.png" alt="" /><i className="fab fa-linkedin-in"></i></a>
            <a><img  className="socialmedia_icon"src="../src/assets/youtube.png" alt="" /><i className="fab fa-youtube-in"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Website.</p>
      </div>
    </footer>

      </div>
    </>
  );
}
