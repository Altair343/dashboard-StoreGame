import React from 'react';
import Navigation from '../Organims/Navigation';

const ViewNavbar = () => {

  // Verificamos si existe el token
  const userLogged = window.localStorage.getItem('token');
  const verifiToken = window.sessionStorage.getItem('verifyToken');
  const roleUser = window.sessionStorage.getItem('roleUser');
  if (!userLogged || !verifiToken || roleUser !== 'admin') {
    return (
      <>
      </>
    );
  }
  
  return <Navigation />;
}


export default ViewNavbar;
