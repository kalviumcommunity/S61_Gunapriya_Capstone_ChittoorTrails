import React, { useState ,useEffect} from 'react';
import './Addpost.css';
import { useNavigate } from 'react-router-dom';


export default function AddPostPage() {
  const navigate = useNavigate();
  const [popupMsg, setPopupMsg] = useState('');
  const [token, setToken] = useState(''); 

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
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      setFormData(prevState => ({
        ...prevState,
        imageUrl: event.target.result
      }));
    };
  
    reader.readAsDataURL(file);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting form data",formData);
    try {
      const storedToken = localStorage.getItem('token');
      console.log(storedToken);
      if (!storedToken) {
        throw new Error('No token available');
      }
  
      const response = await fetch('http://localhost:4001/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`  
        },
        body: JSON.stringify({...formData,users:token})
      });
  
      console.log(response);
      if (response.ok) {
        // Reset form and show success message
        setFormData({
          name: '',
          location: '',
          description: '',
          type: '',
          ratings: '',
          imageUrl: '',
          openingHours: ''
        });
        setPopupMsg('Post added successfully');
  
        // Navigate after a delay
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        // Handle error response
        const errorData=await response.json();
        console.error('Failed to add post:', errorData);
        setPopupMsg('Failed to add post'+errorData.message);
      }
    } catch (error) {
      console.error('Error adding post:', error.message);
      setPopupMsg('Error adding post'+error.message);
    }
  };
  



  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
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
            type="file"
            id="fileInput"
            name="imageFile"
            accept="image/*"
            onChange={handleImageChange}
            className="form-image-input"
            style={{ display: 'none' }}
          />
          <button type="button" className="upload-button" onClick={handleButtonClick}>Upload Image</button>
          <label className="form-image-label">
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="form-image-input"
            />
            Upload Image
          </label>
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
