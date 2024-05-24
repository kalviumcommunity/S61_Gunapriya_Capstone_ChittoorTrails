import React from 'react'
import "./Editpost.css"
import  { useState, useEffect } from 'react';

export default function Editpost({ postId }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    type: '',
    ratings: 0,
    imageUrl: '',
    openingHours: ''
  });

  useEffect(() => {
    // Fetch post data based on postId
    // Populate form data with fetched data
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated post data to the server
  };

  return (
    <>
     <div className="container_editform">
      {/* <div className="image-container">
        <img src="../src/assets/Editbackground.jpeg" alt="Image for login" />
      </div> */}
      <div className="form-container">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />

          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>

          <label htmlFor="type">Type:</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select type</option>
            <option value="Hill">Hill</option>
            <option value="Waterfall">Waterfall</option>
            <option value="Hotel">Hotel</option>
            <option value="Fort">Fort</option>
            <option value="Temple">Temple</option>
            <option value="Forest">Forest</option>
            <option value="Others">Others</option>
          </select>

          <label htmlFor="ratings">Ratings:</label>
          <input type="number" id="ratings" name="ratings" value={formData.ratings} onChange={handleChange} required />

          <label htmlFor="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />

          <label htmlFor="openingHours">Opening Hours:</label>
          <input type="text" id="openingHours" name="openingHours" value={formData.openingHours} onChange={handleChange} required />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
    </>
  )
}
