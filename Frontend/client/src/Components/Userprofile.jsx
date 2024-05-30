import React, { useState } from 'react';
import './Userprofile.css';
import { Link } from 'react-router-dom'; 
export default function ProfilePage() {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
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
            <li> <Link to='/logout'>Logout</Link></li>
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
    </div>
    </div>
  
  );
}
