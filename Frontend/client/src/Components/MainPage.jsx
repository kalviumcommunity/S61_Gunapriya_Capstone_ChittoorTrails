import React, { useState, useEffect } from 'react';
import './MainPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://capstone-chittoortrails.onrender.com/api/allpost')
      .then(response => {
        setPlaces(response.data.data);
        setFilteredPlaces(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching places:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredPlaces(
      places.filter(place =>
        (filterType === '' || place.type.toLowerCase() === filterType.toLowerCase()) &&
        (searchTerm === '' || place.name.toLowerCase().includes(searchTerm.toLowerCase()) || place.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, filterType, places]);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="page-container">
      <div className="main-page">
        <div className="header">
          <img
            src="../assets/user.png"
            alt="User Profile"
            className="profile-pic"
            onClick={handleProfileClick}
          />
        </div>
        <div className="content">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)} 
            className="filter-select"
          >
            <option value="">All</option>
            <option value="Waterfall">Waterfall</option>
            <option value="Waterfall">Hill</option>
            <option value="Hotel">Hotel</option>
            <option value="Fort">Fort</option>
            <option value="Temple">Temple</option>
            <option value="Forest">Forest</option>
            <option value="Others">Others</option>
            <option value="Restaurant">Restaurant</option>
          </select>
          <h1>All Places</h1>
          <ul className="places-list">
            {filteredPlaces.map(place => (
              <div key={place._id} className="place-info">
                <h2 className="place-name">{place.name}</h2>
                <p className="place-location">Location: {place.location}</p>
                <p className="place-description">Description: {place.description}</p>
                <p className="place-type">Type: {place.type}</p>
                <p className="place-ratings">Ratings: {place.ratings}</p>
                <img src={place.imageUrl} alt={place.name} className="place-image" />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
