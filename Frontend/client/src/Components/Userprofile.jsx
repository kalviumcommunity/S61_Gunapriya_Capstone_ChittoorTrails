import React, { useState, useEffect } from 'react';
import './Userprofile.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage() {
  const [showOptions, setShowOptions] = useState(false);
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/signin');  // Redirect to signin if no token is found
    } else {
      axios.get('https://capstone-chittoortrails.onrender.com/api/read', {
        headers: { 'Authorization': `Bearer ${storedToken}` }
      })
        .then(response => {
          console.log(response.data);
          setPlaces(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching places:', error);
        });
    }
  }, [navigate]);


  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDelete = (id) => {
    const storedToken = localStorage.getItem('token');
    axios.delete(`https://capstone-chittoortrails.onrender.com/api/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${storedToken}` }
    })
      .then(response => {
        console.log('Place deleted:', response.data);
        setPlaces(places.filter(place => place._id !== id));
      })
      .catch(error => {
        console.error('Error deleting place:', error);
      });
  };
  

  const handleEdit = (place) => {
    navigate('/editpost', { state: { place } });
  };
  
  

  return (
    <div className='profile_main_container'>
      <div className="profile-container">
        <div className="profile-header">
          <img src="../assets/user.png" alt="User Profile" className="profile-pic" />
          <div className="username">Username</div>
          <img
            src="../assets/setting.png"
            alt="Settings"
            className="settings-icon"
            onClick={toggleOptions}
          />
        </div>
        {showOptions && (
          <div className="options">
            <ul>
              <li><Link to="/addpost">Add Post</Link></li> 
              <li><Link to='/editpost'>Edit Post</Link></li> 
              <li><Link to='/editpost'>Delete Post</Link></li>  
              <li><Link to='/logout'>Logout</Link></li>
            </ul>
          </div>
        )}
        <div className="profile-content">
          <div className="like-dislike-container">
            <div className="like-count">Likes: 0</div>
            <div className="dislike-count">Dislikes: 0</div>
          </div>
          <div className="button-container">
            <a href="/main" className="other-page-link">Back to Main Page</a>
          </div>
        </div>
      </div>
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
              <p>Opening Hours: {place.openingHours}</p>
              <button className='edit-button1' onClick={() => handleDelete(place._id)}>Delete</button>
              <button  className="cancel-button1 "onClick={() => handleEdit(place)}>Edit</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
