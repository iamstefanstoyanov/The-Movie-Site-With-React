import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';

import { searchForMovies } from '../services/moviesService';
import MoviesList from './MoviesList';
import Spinner from './Spinner';

export default function Search() {
  const [input, setInput] = useState('');
  const [movies, setMoives] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    searchForMovies(input, page)
      .then((data) => {
        setMoives(Object.values(data.results));
        setTotalPages(data.total_pages);
        window.scrollTo(0, 0);
      })
      .finally(() => setIsLoading(false));
  }, [input, page]);

  const handleSubmit = (value) => {
    setInput(value);
  };

  const handlePageChange = (e, p) => {
    setPage(p);
  };

  return (
    <>
      <h1>Search</h1>
      <div className='search-container'>
        <div className='search'>
          <input
            type='text'
            value={input}
            className='searchTerm'
            onChange={(e) => handleSubmit(e.target.value)}
            placeholder='Search for your favorite movie...'
          />
        </div>
        <div className='movies-list-container'>
          {isLoading && <Spinner />}

          {movies.map((movie) => (
            <MoviesList
              key={movie.id}
              id={movie.id}
              title={movie.title}
              relDate={movie.release_date}
              description={movie.overview}
              image={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
              vote={movie.vote_average}
            />
          ))}
        </div>
        {!movies.length == 0 && (
          <div>
            <Pagination
              onChange={handlePageChange}
              count={totalPages}
              variant='outlined'
              shape='rounded'
            />
          </div>
        )}
      </div>
    </>
  );
}
