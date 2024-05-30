import React, { useState } from 'react';
import './Editpost.css'; 
import { Link } from 'react-router-dom';

export default function EditPostPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to backend)
    console.log(formData);
    // Reset form data after submission
    setFormData({
      name: '',
      location: '',
      description: '',
      type: '',
      ratings: '',
      imageUrl: '',
      openingHours: ''
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
          <Link to='/profile'><button type="submit" className="edit-button">Edit</button></Link>
           <Link to='/profile'><button type="submit" className="delete-button">Delete</button></Link>          
        </form>
      </div>
    </div>
  );
}
