export const getCurrentMovieComments = async (id) => {
  const url = `${import.meta.env.VITE_API_URL}/data/comments?where=movieId%3D%22${id}%22`;
  try {
    const data = await (
      await fetch(url, {
        method: 'GET',
      })
    ).json();
    return Object.values(data);
  } catch (e) {
    alert(e.message);
  }
};

export const getCurrentUserComments = async (userId) => {
  const url = `${import.meta.env.VITE_API_URL}/data/comments?where=_ownerId%3D%22${userId}%22`;
  try {
    const data = await (
      await fetch(url, {
        method: 'GET',
      })
    ).json();
    return Object.values(data);
  } catch (e) {
    alert(e.message);
  }
};

export const deleteComment = async (id) => {
  const url = `${import.meta.env.VITE_API_URL}/data/comments/${id}`;
  const token = JSON.parse(localStorage.getItem('auth')).accessToken;

  try {
    const data = await (
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'X-Authorization': token,
        },
      })
    ).json();
    return data;
  } catch (e) {
    alert(e.message);
  }
};

export const addComment = async (username, inputs, title, id) => {
  const url = `${import.meta.env.VITE_API_URL}/data/comments`;
  const token = JSON.parse(localStorage.getItem('auth')).accessToken;

  try {
    const body = {
      username: username,
      comment: inputs.text,
      title: title,
      movieId: id,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (e) {
    alert(e.message);
  }
};

export const getCurrentComment = async (id) => {
  const url = `${import.meta.env.VITE_API_URL}/data/comments/${id}`;
  try {
    const data = await (
      await fetch(url, {
        method: 'GET',
      })
    ).json();
    return data;
  } catch (e) {
    alert(e.message);

  }
};

export const editComment = async (newComment) => {
  const url = `${import.meta.env.VITE_API_URL}/data/comments/${newComment._id}`;
  const token = JSON.parse(localStorage.getItem('auth')).accessToken;

  try {
    const body = {
      username: newComment.username,
      comment: newComment.comment,
      title: newComment.title,
      movieId: newComment.movieId,
    };
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (e) {
    alert(e.message);
  }
};
