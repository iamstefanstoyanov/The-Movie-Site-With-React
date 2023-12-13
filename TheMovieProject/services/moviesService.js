const optionsTMDB = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTIzYWEzYTRlOTRhYzhkYTQwMDk1Mzk2ZDQ3MDZkMiIsInN1YiI6IjY1MzhmYWQyZjQ5NWVlMDBmZjY2M2U4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IzQpk27slS-MSxretzQENo36fQajZg1E14HSlXkTVOM',
  },
};
export const getAllMovies = async (page) => {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    const data = await (await fetch(url, optionsTMDB)).json();
    return Object.values(data.results);
  } catch (e) {
    alert(e.message);
  }
};

export const searchForMovies = async (input, page) => {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&&page=${page}`;
    const data = await (await fetch(url, optionsTMDB)).json();
    return data;
  } catch (e) {
    alert(e.message);
  }
};
export const getTopRatedAndNowPlaying = async (request) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${request}`;
    const data = await (await fetch(url, optionsTMDB)).json();
    return Object.values(data.results.slice(0, 5));
  } catch (e) {
    alert(e.message);
  }
};
export const getOneMovie = async (id) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const data = await (await fetch(url, optionsTMDB)).json();
    return data;
  } catch (e) {
    alert(e.message);
  }
};
