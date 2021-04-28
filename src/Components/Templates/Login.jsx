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
      const { code } = error.response.data;
      if (code === 'auth/wrong-email') {
        setMessageError('Correo valido');
      } else if (code === 'auth/wrong-password') {
        setMessageError('contraseña incorrecta');
      } else if (code === 'auth/global-error') {
        setMessageError('Ocurrio un error no previsto con nuestros servidores intentelo de nuevo o mas tarde');
      } else {
        setMessageError('Ocurrio un error');
      }
    }
  }

  return (
    <div className="container align-items-center">
      <div className="grid col-3 row-1">
        <div className="col"></div>
        <div className="col">
          <div>
            <form>
              <div className="mb-3">
                <input onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" placeholder="Correo" />
              </div>
              <div className="mb-3">
                <input onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" placeholder="Contraseña" />
              </div>
              <div className="mb-3">
                <button onClick={authentication} type="submit" className="btn btn-dark w-100">Iniciar sesión</button>
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
          </div>
        </div>
        <div className="col"></div>
      </div>

    </div>
  )
}


export default Login;
