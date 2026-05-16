import React, { useState } from 'react';
import './Cities.css';

const citiesData = [
  { id: 1, name: 'Paris', country: 'France', emoji: '🗼', description: 'The city of love and lights, famous for the Eiffel Tower and incredible cuisine.' },
  { id: 2, name: 'Tokyo', country: 'Japan', emoji: '🗾', description: 'A vibrant mix of traditional culture and futuristic technology.' },
  { id: 3, name: 'New York', country: 'USA', emoji: '🗽', description: 'The city that never sleeps, home to Times Square and Central Park.' },
  { id: 4, name: 'Dubai', country: 'UAE', emoji: '🏙️', description: 'A modern marvel in the desert with stunning skyscrapers and luxury experiences.' },
  { id: 5, name: 'London', country: 'UK', emoji: '🎡', description: 'A historic city with iconic landmarks like Big Ben and Buckingham Palace.' },
  { id: 6, name: 'Sydney', country: 'Australia', emoji: '🦘', description: 'Famous for its Opera House, beautiful beaches and outdoor lifestyle.' },
];

function Cities() {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  const filteredCities = citiesData.filter(city =>
    city.name.toLowerCase().includes(search.toLowerCase()) ||
    city.country.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (city) => {
    let updated;
    if (favorites.find(f => f.id === city.id)) {
      updated = favorites.filter(f => f.id !== city.id);
    } else {
      updated = [...favorites, city];
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="cities">
      <h1>Explore Cities 🌍</h1>
      <input
        type="text"
        placeholder="Search cities or countries..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="cities-grid">
        {filteredCities.map(city => (
          <div key={city.id} className="city-card">
            <div className="city-emoji">{city.emoji}</div>
            <h2>{city.name}</h2>
            <p className="country">{city.country}</p>
            <p className="description">{city.description}</p>
            <button
              className={`fav-btn ${favorites.find(f => f.id === city.id) ? 'favorited' : ''}`}
              onClick={() => toggleFavorite(city)}
            >
              {favorites.find(f => f.id === city.id) ? '❤️ Saved' : '🤍 Save'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cities;