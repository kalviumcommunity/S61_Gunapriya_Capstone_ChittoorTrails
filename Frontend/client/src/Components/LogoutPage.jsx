import React from 'react';
import './Logout.css';
import { Link } from 'react-router-dom';


export default function LogoutPage() {

  return (
    <div className='main_logout'>
      <div className="container_logout">
        <div className="form-container_logout">
          <h2 className='logout'>Logout</h2>
          <Link to='/'><button className="button_logout">Logout</button></Link>
          
        </div>
        <div className="image-logout-container">
          <img className="image_logout" src="../assets/logout.png.png" alt="Logout" />
        </div>
      </div>
    </div>
  );
}
