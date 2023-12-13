const url = `${import.meta.env.VITE_API_URL}/users`;

export const login = async (email, password) => {
  try {
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error('Wrong username or password!');
    }
    const data = await response.json();
    return data;
  } catch (e) {
    alert(e.message);
  }
};

export const register = async (username, password, email, imgUrl) => {
  try {
    const response = await fetch(`${url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email,
        imgUrl,
      }),
    });
    if (response.status == 409) {
      throw new Error('User with this email already exists');
    }
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    const data = await response.json();
    return data;
  } catch (e) {
    alert(e.message);
  }
};

export const logout = async () => {
  const token = JSON.parse(localStorage.getItem('auth')).accessToken;

  const result = await fetch(`${url}/logout`, {
    method: 'GET',
    headers: {
      'X-Authorization': token,
    },
  });
  return result;
};
