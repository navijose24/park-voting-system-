import React from 'react';

function ParkCard({ park }) {
  if (!park) return null;
  return (
    <div style={{ border: '1px solid #ccc', padding: 20, width: 300 }}>
      <h2>{park.name}</h2>
      {park.image && <img src={park.image} alt={park.name} style={{ width: '100%' }} />}
      <p>{park.summary}</p>
    </div>
  );
}

export default ParkCard; 