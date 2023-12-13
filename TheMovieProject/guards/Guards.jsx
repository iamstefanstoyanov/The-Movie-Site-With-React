import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../context/authContext';

export default function Guard() {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}
