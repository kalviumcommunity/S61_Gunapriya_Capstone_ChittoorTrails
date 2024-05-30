import React from 'react'
import "./Footer.css"

export default function Footer() {
  return (
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
            <a><img  className="socialmedia_icon"src="../assets/facebook.png" alt="" /><i className="fab fa-facebook-f"></i></a>
            <a><img className='socialmedia_icon' src="../assets/twitter.png" alt="" /><i className="fab fa-twitter"></i></a>
            <a><img className='socialmedia_icon' src="../assets/instagram.png" alt="" /><i className="fab fa-instagram"></i></a>
            <a><img  className="socialmedia_icon"src="../assets/linkedin.png" alt="" /><i className="fab fa-linkedin-in"></i></a>
            <a><img  className="socialmedia_icon"src="../assets/youtube.png" alt="" /><i className="fab fa-youtube-in"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Website.</p>
      </div>
    </footer>
    </div>
  )
}
