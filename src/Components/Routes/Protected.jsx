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
        console.log(respond.data);
        if (respond.data.code === 'token/verify') {

           if (respond.data.data.role === 'admin') {
            sessionStorage.setItem('verifyToken', true);
            //guardar el rol del usuario
            //respond.data.role

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
  }

//validamos el rol

  return <Route {...rest} component={Component} />
}

export default Protected;
