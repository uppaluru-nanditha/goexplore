import React, { useState, useEffect } from 'react';
import './Cities.css';

function Cities() {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/cities')
      .then(res => res.json())
      .then(data => {
        setCities(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (category) {
      fetch(`http://localhost:8000/cities/recommend/${category}`)
        .then(res => res.json())
        .then(data => setRecommendations(data));
    }
  }, [category]);

  const filteredCities = cities.filter(city =>
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

  if (loading) return <div style={{textAlign:'center', padding:'100px', fontSize:'24px'}}>Loading cities... 🌍</div>;

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
      <div className="categories">
        <p>Get AI Recommendations:</p>
        {['romance', 'culture', 'adventure', 'luxury'].map(cat => (
          <button
            key={cat}
            className={`cat-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat === 'romance' ? '❤️' : cat === 'culture' ? '🏛️' : cat === 'adventure' ? '🧗' : '💎'} {cat}
          </button>
        ))}
        {category && <button className="cat-btn" onClick={() => { setCategory(''); setRecommendations([]); }}>❌ Clear</button>}
      </div>
      {recommendations.length > 0 && (
        <div className="recommendations">
          <h2>✨ Recommended for you</h2>
          <div className="cities-grid">
            {recommendations.map(city => (
              <div key={city.id} className="city-card recommended">
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
      )}
      <h2 style={{textAlign:'center', color:'#2c3e50', marginTop:'30px'}}>All Cities</h2>
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