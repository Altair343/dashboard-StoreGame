import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="nav">
          <div className="content-logo">
            
          </div>
          <li className="nav-item">
            <Link className="nav-link" to="/"><i className="fas fa-home"></i>  <span className="text-link ocult">Home</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/all"><i className="fas fa-gamepad"></i> <span className="text-link ocult">Videogames</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/orders"> <i className="fas fa-archive"></i> <span className="text-link ocult">Orders</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#"><i className="fas fa-cog"></i> <span className="text-link ocult">Settings</span></Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation;
