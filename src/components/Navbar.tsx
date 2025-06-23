import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f4f4f4' }}>
      <Link to="/">Home</Link> | <Link to="/chzzk">Chzzk</Link>
    </nav>
  );
};

export default Navbar;
