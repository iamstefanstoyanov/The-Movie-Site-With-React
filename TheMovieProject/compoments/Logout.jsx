import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '../services/authService';

import AuthContext from '../context/authContext';

export default function Logout() {

  const { logoutHandler } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    logout()
      .then((res) => {
        if (res.status === 204) {
          logoutHandler();
          navigate('/');
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
  return null;
}
