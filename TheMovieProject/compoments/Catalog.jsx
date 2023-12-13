import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import { getAllMovies } from '../services/moviesService';

import Card from './Card';
import Spinner from './Spinner';

export default function Catalog() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllMovies(page)
      .then((data) => {
        setMovies(data);
        window.scrollTo(0, 0);
      })
      .finally(() => setIsLoading(false));
  }, [page]);

  const handleChange = (e, p) => {
    setPage(p);
  };

  return (
    <>
      <h1>Catalog</h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className='catalog'>
          {movies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.title}
              relDate={movie.release_date}
              image={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
              vote={movie.vote_average}
            />
          ))}
        </div>
      )}
      <Pagination
        onChange={handleChange}
        count={500}
        variant='outlined'
        shape='rounded'
      />
    </>
  );
}
