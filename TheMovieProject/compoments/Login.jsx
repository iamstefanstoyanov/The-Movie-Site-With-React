import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import AuthContext from '../context/authContext';
import useForm from '../hooks/useForm';

const formKeys = {
  email: 'email',
  password: 'password',
};

export default function Login() {
  const { loginHandler,isAuth } = useContext(AuthContext);

  if (isAuth) {
    return <Navigate to='/'/>;
  }
 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initialValues = useMemo(
    () => ({
      [formKeys.email]: '',
      [formKeys.password]: '',
    }),
    []
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { inputs, onChangeInput, submitForm } = useForm(
    loginHandler,
    initialValues
  );
  
  return (
    <div className='signup-container'>
      <div className='login-container'>
        <div className='signup-title'>
          <span>
            Don&#39;t have an account?
            <Link to='/signup'>Sign Up</Link>
          </span>
        </div>
        <div className='form'>
          <form id='login' onSubmit={submitForm}>
            <input
              type='email'
              placeholder='email@email.com'
              name={formKeys.email}
              onChange={onChangeInput}
              value={inputs[formKeys.email]}
            />

            <input
              type='password'
              placeholder='password...'
              name={formKeys.password}
              onChange={onChangeInput}
              value={inputs[formKeys.password]}
            />
            <input type='submit' className='btn-submit' value='Login' />
          </form>
        </div>
      </div>
    </div>
  );
}
