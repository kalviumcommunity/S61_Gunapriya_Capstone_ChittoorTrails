import React from 'react';
import './MainPage.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function MainPage() {
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
    <div className="main-page">
      <nav className="sidebar">
        <ul>
          <li><a href="#hill">Hill</a></li>
          <li><a href="#waterfall">Waterfall</a></li>
          <li><a href="#hotel">Hotel</a></li>
          <li><a href="#fort">Fort</a></li>
          <li><a href="#temple">Temple</a></li>
          <li><a href="#forest">Forest</a></li>
          <li><a href="#others">Others</a></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Welcome to the Main Page</h1>
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
      </div>
    </div>
  );
}
