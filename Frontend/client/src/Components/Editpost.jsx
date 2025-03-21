import React, { useState, useEffect } from 'react';
import './Editpost.css'; 
import { useLocation, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

export default function EditPostPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { place } = location.state;

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    type: '',
    ratings: '',
    imageUrl: '',
    openingHours: ''
  });

  useEffect(() => {
    if (place) {
      setFormData({
        name: place.name,
        location: place.location,
        description: place.description,
        type: place.type,
        ratings: place.ratings,
        imageUrl: place.imageUrl,
        openingHours: place.openingHours
      });
    }
  }, [place]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('token');
    axios.put(`https://capstone-chittoortrails.onrender.com/api/update/${place._id}`, formData, {
      headers: { 'Authorization': `Bearer ${storedToken}` }
    })
      .then(response => {
        console.log('Place updated:', response.data);
        navigate('/profile');
      })
      .catch(error => {
        console.error('Error updating place:', error);
      });
  };
  

  return (
    <div className="edit-post-container">
      <div className="form-container">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-input"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="form-input"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="form-textarea"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Type</option>
            <option value="Hill">Hill</option>
            <option value="Waterfall">Waterfall</option>
            <option value="Hotel">Hotel</option>
            <option value="Fort">Fort</option>
            <option value="Temple">Temple</option>
            <option value="Forest">Forest</option>
            <option value="Others">Others</option>
          </select>
          <input
            type="number"
            name="ratings"
            value={formData.ratings}
            onChange={handleChange}
            placeholder="Ratings"
            className="form-input"
          />
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="form-input"
          />
          <input
            type="text"
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            placeholder="Opening Hours"
            className="form-input"
          />
          <button type="submit" className="edit-button">Save Changes</button>
          <Link to='/profile'><button type="button" className="cancel-button">Cancel</button></Link>          
        </form>
      </div>
    </div>
  );
}
