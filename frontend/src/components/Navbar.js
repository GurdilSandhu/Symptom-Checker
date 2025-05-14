import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Healthcare Symptom Checker</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        {/*<Link to="/dashboard">Dashboard</Link>*/}
      </div>
    </nav>
  );
};

export default Navbar;
