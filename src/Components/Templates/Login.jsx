import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const History = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageError, setMessageError] = useState(null);

  const authentication = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessageError('Correo vacio');
      return;
    }
    if (!password.trim()) {
      setMessageError('Contraseña vacia');
      return;
    }

    const credentialsUser = {
      "email": email,
      "password": password
    }

    try {
      const baseUrl = 'http://localhost:4000/api/auth/signin';
      const { data } = await axios.post(baseUrl, credentialsUser);

      if (data.response === true) {
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('verifyToken',true);
        History.push('/');
        
      }

    } catch (error) {
      const { code } = error.response.data;

      if (code === 'auth/wrong-email') {
        setMessageError('Correo valido');
      } else if (code === 'auth/wrong-password') {
        setMessageError('contraseña incorrecta');
      } else if (code === 'auth/global-error') {
        setMessageError('Ocurrio un error no previsto con nuestros servidores intentelo de nuevo o mas tarde');
      }else{
        setMessageError('Ocurrio un error');
      }
    }

  }

  return (
    <>
      <form>
        <div className="form-control">
          <input onChange={(e) => setEmail(e.target.value)} className="form-control__item" type="email" placeholder="Correo" />
        </div>
        <div className="form-content">
          <input onChange={(e) => setPassword(e.target.value)} className="form-control__item" type="password" placeholder="Contraseña" />
        </div>
        <div className="form-control">
          <button onClick={authentication} type="submit" className="btn btn-primary">Iniciar sesión</button>
        </div>
        <div>
          {
            messageError != null
              ? (
                <div className="alert alert-danger">
                  {messageError}
                </div>
              )
              : ``
          }
        </div>
      </form>
    </>
  )
}

export default Login;
