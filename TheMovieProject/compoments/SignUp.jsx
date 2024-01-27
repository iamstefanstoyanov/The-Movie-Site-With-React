import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import AuthContext from '../context/authContext';
import useForm from '../hooks/useForm';

const formKeys = {
  username: 'username',
  email: 'email',
  password: 'password',
  repass: 'repass',
  url: 'imgUrl',
};

export default function SignUp() {
  const { registerHandler,isAuth } = useContext(AuthContext);

  if (isAuth) {
    return <Navigate to='/'/>;
  }
  
  const initialValues = useMemo(
    () => ({
      [formKeys.username]: '',
      [formKeys.email]: '',
      [formKeys.password]: '',
      [formKeys.repass]: '',
      [formKeys.url]: '',
    }),
    []
  );
  const { inputs, errors, onChangeInput, submitForm } = useForm(
    registerHandler,
    initialValues
  );
  return (
    <div className='signup-container'>
      <div className='signup'>
        <div className='signup-title'>
          <span>
            Already have an account?
            <Link to='/login'>Login</Link>
          </span>
        </div>
        <div className='form'>
          <form onSubmit={submitForm}>
            <input
              type='text'
              placeholder='Username...'
              name={formKeys.username}
              onChange={onChangeInput}
              value={inputs[formKeys.username]}
            />
            {errors?.username && (
              <span className='error'>{errors.username}</span>
            )}
            <input
              type='email'
              placeholder='Email'
              name={formKeys.email}
              onChange={onChangeInput}
              value={inputs[formKeys.email]}
            />
            {errors?.email && <span className='error'>{errors.email}</span>}
            <input
              type='text'
              placeholder='Profile image URL (optional)'
              name={formKeys.url}
              onChange={onChangeInput}
              value={inputs[formKeys.url]}
            />
            <input
              type='password'
              placeholder='Password'
              name={formKeys.password}
              onChange={onChangeInput}
              value={inputs[formKeys.password]}
            />
            {errors?.password && (
              <span className='error'>{errors.password}</span>
            )}
            <input
              type='password'
              placeholder='Confirm password'
              name={formKeys.repass}
              onChange={onChangeInput}
              value={inputs[formKeys.repass]}
            />
            {errors?.repass && <span className='error'>{errors.repass}</span>}
            <input
              type='submit'
              className='btn-submit'
              value='SignUp'
              disabled={Object.keys(errors).length > 0}
            />
            {Object.keys(errors).length > 0 && (
              <span className='error'>Inavlid Form Data!</span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
