import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { login, register } from '../services/authService';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage('auth',{});
  const navigate = useNavigate();

  const loginHandler = async (inputs) => {
    const result = await login(inputs.email, inputs.password);
    if (result !== undefined) {
      setAuth(result);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const registerHandler = async (inputs) => {
    const result = await register(
      inputs.username,
      inputs.password,
      inputs.email,
      inputs.imgUrl
    );

    if (result !== undefined) {
      setAuth(result);
      navigate('/');
    } else {
      navigate('/signup');
    }
  };

  const logoutHandler = () => {
    setAuth({});
    localStorage.removeItem('auth');
  };

  const data = {
    loginHandler,
    registerHandler,
    logoutHandler,
    username: auth.username,
    email: auth.email,
    imgUrl: auth.imgUrl,
    userId: auth._id,
    registeredOn: auth._createdOn,
    isAuth: !!auth.username,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export default AuthContext;
