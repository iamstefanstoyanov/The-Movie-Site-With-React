import { useEffect, useState } from 'react';
import { getTopRatedAndNowPlaying } from '../services/moviesService';

import Card from './Card';
import Spinner from './Spinner';

export default function NowPlaying() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTopRatedAndNowPlaying('now_playing')
      .then(setMovies)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1>Now Playing</h1>
      {isLoading && <Spinner />}
      <div className='top-rated'>
        {movies.map((movie) => (
          <Card
            id={movie.id}
            key={movie.id}
            title={movie.title}
            relDate={movie.release_date}
            description={movie.overview}
            image={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
            vote={movie.vote_average}
          />
        ))}
      </div>
    </>
  );
}
