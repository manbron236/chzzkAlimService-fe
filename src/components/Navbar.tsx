import React from 'react';
// import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="custom-navbar">
      <div className="site-title">민덕사</div>
      <div className="nav-links">
        <a href="/" className="nav-link">Home</a>
        <a href="/chzzk" className="nav-link">Chzzk</a>
      </div>
    </nav>
  );
};

export default Navbar;
