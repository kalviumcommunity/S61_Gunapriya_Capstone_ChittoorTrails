import React from 'react';
import './Homepage.css';
import { useEffect,useState } from 'react';
import axios from 'axios';



export default function Homepage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:4001/api/read')
        .then(response => {
          console.log(response.data);
          setPlaces(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching places:', error);
        });
    }, []);
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
          </div>
        ))}
       </ul>
      </div>
    </>
  );
}
