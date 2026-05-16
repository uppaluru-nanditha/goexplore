import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Explore the World 🌍</h1>
        <p>Discover amazing cities, attractions, and hidden gems around the world!</p>
        <Link to="/cities" className="explore-btn">Start Exploring</Link>
      </div>
      <div className="features">
        <div className="feature-card">
          <span>🏙️</span>
          <h3>Browse Cities</h3>
          <p>Explore top cities around the world</p>
        </div>
        <div className="feature-card">
          <span>🔍</span>
          <h3>Search Places</h3>
          <p>Find attractions and hidden gems</p>
        </div>
        <div className="feature-card">
          <span>❤️</span>
          <h3>Save Favorites</h3>
          <p>Keep track of places you love</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
