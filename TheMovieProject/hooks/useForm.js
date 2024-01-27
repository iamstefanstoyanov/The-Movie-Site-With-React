import { useEffect, useState } from 'react';

export default function useForm(submitHandler, initialValues) {

  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setInputs(initialValues);
  }, [initialValues]);

  const newState = { ...errors };

  const onChangeInput = (e) => {
    setInputs((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));

    const { name, value } = e.target;

    if (name === 'username') {
      if (value.trim().length <= 4) {
        newState.username = 'Username must be at least 4 characters!';
      } else {
        delete newState.username;
      }
    }
    if (name === 'email') {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (!emailPattern.test(value)) {
        newState.email = 'Invalid email address!';
      } else {
        delete newState.email;
      }
    }
    if (name === 'password') {
      if (value.length <= 4) {
        newState.password = 'Password must be at least 5 characters long';
      } else {
        delete newState.password;
      }
    }

    if (name === 'repass' && value !== inputs.password) {
      newState.repass = "Passwords don't match!";
    } else {
      delete newState.repass;
    }
    setErrors(newState);
  };
  
  const submitForm = (e) => {
    e.preventDefault();
    submitHandler(inputs);
  };

  return { inputs, errors, onChangeInput, submitForm };
}
