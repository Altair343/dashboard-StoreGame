import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const Register = () => {
  const History = useHistory();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageError, setMessageError] = useState(null);

  const register = async (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      setMessageError('nombre de usuario vacio');
      return;
    }

    if (!email.trim()) {
      setMessageError('Correo vacio');
      return;
    }
    if (!password.trim()) {
      setMessageError('Contraseña vacia');
      return;
    }

    const credentialsUser = {
      "username": userName,
      "email": email,
      "password": password,
      "roles": ["admin"]
    }

    try {
      const baseUrl = 'http://localhost:4000/api/auth/signup';
      const { data } = await axios.post(baseUrl, credentialsUser);

      if (data.response === true) {
        const rolesUser = data.role;

        for (let i = 0; i < rolesUser.length; i++) {
          if (rolesUser[i] === "admin") {
            localStorage.setItem('token', data.token);
            sessionStorage.setItem('verifyToken', true);
            sessionStorage.setItem('roleUser', rolesUser[i]);
            History.push('/');

          } else {
            setMessageError('No tiene el rol de administrador');
          }
        }
      }
    } catch (error) {
      const er = error.response.data;
      console.log(er);
    }


  }
  return (
    <div className="container align-items-center background-withe">
      <div className="grid col-3 row-1">
        <div className="col"></div>
        <div className="col">
          <div>
            <form>
              <div className="mb-3">
                <input onChange={(e) => setUserName(e.target.value)} className="form-control" type="email" placeholder="nombre de usuario" />
              </div>
              <div className="mb-3">
                <input onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" placeholder="Correo" />
              </div>
              <div className="mb-3">
                <input onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" placeholder="Contraseña" />
              </div>
              <div className="mb-3">
                <button onClick={register} type="submit" className="btn btn-dark w-100">Registarse</button>
              </div>
            </form>
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
            <div className="mb-3">
              <Link to="/login" className="ord_link">Iniciar sesión</Link>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>

    </div>
  )
}

export default Register;
