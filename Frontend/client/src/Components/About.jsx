import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  // Inline styles to ensure consistent rendering
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundImage: "url('../assets/about.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      fontFamily: "'Roboto', sans-serif"
    },
    contentWrapper: {
      maxWidth: '800px',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      borderRadius: '20px',
      padding: '30px',
      position: 'relative',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    header: {
      position: 'relative',
      marginBottom: '30px',
      textAlign: 'center'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: '20px'
    },
    closeButton: {
      position: 'absolute',
      top: '0',
      right: '0',
      background: 'none',
      border: 'none',
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#555555',
      cursor: 'pointer',
      transition: 'color 0.3s ease'
    },
    paragraph: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#444444',
      marginBottom: '20px',
      textAlign: 'left'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>ABOUT US</h1>
          <button 
            style={styles.closeButton} 
            onClick={handleClose}
            onMouseOver={(e) => e.target.style.color = '#e74c3c'}
            onMouseOut={(e) => e.target.style.color = '#555555'}
          >
            ×
          </button>
        </div>
        
        <div>
          <p style={styles.paragraph}>
            Explore a diverse range of travel options seamlessly with our user-friendly interface. 
            Whether you're seeking spiritual solace at temples, budget-friendly stays at hostels, or culinary adventures at local restaurants, we've got you covered. 
            Discover and learn more about each destination with ease, allowing you to immerse yourself in the rich culture and natural beauty of Chittoor Trails.
          </p>
          
          <p style={styles.paragraph}>
            Discover the enchanting allure of Chittoor Trails through our About page, where we offer a captivating glimpse into the heart of this vibrant district. 
            Situated in the picturesque landscape of Andhra Pradesh, Chittoor boasts a rich tapestry of history, culture, and natural wonders waiting to be explored. 
            Dive into the annals of time as we unveil the storied past of Chittoor, from ancient dynasties to architectural marvels that stand as testaments to its illustrious heritage. 
            Immerse yourself in the tapestry of traditions and customs that adorn the fabric of Chittoor's cultural landscape, from vibrant festivals to age-old rituals passed down through generations. 
            Embark on a journey of discovery as we unveil the district's top tourist attractions, from majestic temples to scenic vistas and wildlife sanctuaries teeming with biodiversity.
          </p>
          
          <p style={{...styles.paragraph, marginBottom: '0'}}>
            Delve into the vibrant tapestry of local communities that call Chittoor home, each adding their unique flavors to the district's rich cultural mosaic. 
            Embrace the spirit of eco-tourism as we champion sustainable practices and initiatives aimed at preserving the pristine beauty of Chittoor's natural environment. 
            Plan your visit with confidence, armed with practical travel tips, accommodation recommendations, and insights from past travelers who have experienced the magic of Chittoor Trails firsthand. 
            Join us on this immersive adventure and uncover the treasures that await in the captivating realm of Chittoor Trails.
          </p>
        </div>
      </div>
    </div>
  );
}