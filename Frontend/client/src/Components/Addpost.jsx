import React, { useState } from 'react';
import './Addpost.css';
import { useNavigate } from 'react-router-dom';

export default function AddPostPage() {
  const navigate = useNavigate();
  const [popupMsg, setPopupMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    type: '',
    ratings: '',
    imageUrl: '',
    openingHours: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4001/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Reset form data after successful submission
        setFormData({
          name: '',
          location: '',
          description: '',
          type: '',
          ratings: '',
          imageUrl: '',
          openingHours: ''
        });

        // Set success message
        setPopupMsg('Post added successfully');

        // Navigate to main page after 2 seconds
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        console.error('Failed to add post:', response.statusText);
        // Set error message
        setPopupMsg('Failed to add post');
      }
    } catch (error) {
      console.error('Error adding post:', error.message);
      // Set error message
      setPopupMsg('Error adding post');
    }
  };

  return (
    <div className="add-post-container">
      <div className="background-image"></div>
      <div className="form-container">
        <h2>Add New Post</h2>
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
          <button type="submit" className="submit-button">Submit</button>
        </form>
        {popupMsg && <Popup message={popupMsg} clearMessage={() => setPopupMsg('')} />}
      </div>
    </div>
  );
}

function Popup({ message, clearMessage }) {
  return (
    <div className="popup">
      <p>{message}</p>
      <button onClick={clearMessage}>Close</button>
    </div>
  );
}
