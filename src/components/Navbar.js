import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        🌍 GoExplore
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cities">Cities</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
}

export default Navbar;