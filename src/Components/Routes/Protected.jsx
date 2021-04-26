import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

const Protected = ({ component: Component, ...rest }) => {
  const History = useHistory();

  // Verificamos si existe el token
  const userLogged = window.localStorage.getItem('token')
  if (!userLogged) {
    return <Redirect to="/login" />
  }

  // Verificamos si ya se valido el token
  const verifiToken = window.sessionStorage.getItem('verifyToken');
  if (!verifiToken) {
    //aqui verificamos el token 
    const config = {
      headers: {
        Authorization: `Bearer ${userLogged}`
      }
    }

    axios.post('http://localhost:4000/api/users/verifyToken', null, config)
      .then(respond => {

        //entra al if si el token es valido
        if (respond.data.code === 'token/verify') {
          sessionStorage.setItem('verifyToken', true);

        //pregunta por el rol del token si es admin
          if (respond.data.data.role === 'admin') {  
            sessionStorage.setItem('roleUser', respond.data.data.role);
          } else {
            window.localStorage.clear();
            window.sessionStorage.clear();
            History.push('/login');
          }

        } else {
          window.localStorage.clear();
          window.sessionStorage.clear();
          History.push('/login');
        }
      })
      .catch(error => {
        window.localStorage.clear();
        window.sessionStorage.clear();
        History.push('/login');
      })
  }else{
    const roleUser = window.sessionStorage.getItem('roleUser');
    if(roleUser !== 'admin'){
      window.localStorage.clear();
        window.sessionStorage.clear();
        History.push('/login');
    }
  }

  return <Route {...rest} component={Component} />
}


export default Protected;
