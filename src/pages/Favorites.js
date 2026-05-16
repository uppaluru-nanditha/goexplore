import React, { useState } from 'react';
import './Favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="favorites">
      <h1>My Favorites ❤️</h1>
      {favorites.length === 0 ? (
        <div className="empty">
          <p>🌍 No favorites yet!</p>
          <p>Go to Cities and save some places you love!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(city => (
            <div key={city.id} className="favorite-card">
              <div className="city-emoji">{city.emoji}</div>
              <h2>{city.name}</h2>
              <p className="country">{city.country}</p>
              <p className="description">{city.description}</p>
              <button
                className="remove-btn"
                onClick={() => removeFavorite(city.id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;