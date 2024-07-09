import React from 'react';
import './Homepage.css';
import { useEffect,useState } from 'react';
import axios from 'axios';



export default function Homepage() {
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
      axios.get('http://localhost:4001/api/allpost')
        .then(response => {
          console.log(response.data);
          setPlaces(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching places:', error);
        });
    }, []);

    const openModal = (place) => {
      setSelectedPlace(place);
  };

  const closeModal = () => {
      setSelectedPlace(null);
  };

  return (
    <>
         <div className='main_hOME'>
        <img className='image' src="../assets/valley.jpg" alt="Chittoor Valley" />
      </div>
      <div className='Main_heading'>
        <div>
        <div className='explore'>
        <p className='explore_heading'>Explore Beautiful</p>
        </div>
        </div>
        <div className='heading_chittoor'>
        <p className='chittoor_heading'>CHITTOOR</p>
        </div>
      </div>
      <div>
      <h1>All Places</h1>
      <div className='places-container'>
                    {places.map(place => (
                        <div
                            key={place._id}
                            className="place-card"
                            onClick={() => openModal(place)}
                        >
                            <img src={place.imageUrl} alt={place.name} className="place-image" />
                            <h2>{place.name}</h2>
                        </div>
                    ))}
                </div>
      
            {selectedPlace && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedPlace.name}</h2>
                        <img src={selectedPlace.imageUrl} alt={selectedPlace.name} className="place-image" />
                        <p>Location: {selectedPlace.location}</p>
                        <p>Description: {selectedPlace.description}</p>
                        <p>Type: {selectedPlace.type}</p>
                        <p>Ratings: {selectedPlace.ratings}</p>
                        <p>Opening Hours: {selectedPlace.openingHours}</p>
                    </div>
                </div>
            )}
      </div>
    </>
  );
}
