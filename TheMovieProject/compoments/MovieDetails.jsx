import { useEffect, useMemo, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getOneMovie } from '../services/moviesService';
import {
  addComment,
  getCurrentMovieComments,
} from '../services/commentsService';
import Spinner from './Spinner';
import { addToWatchlist } from '../services/watchlistService';
import { formatDate } from '../utils/dataUtils';
import { getCurrentUserWatchlist } from '../services/watchlistService';

import AuthContext from '../context/authContext';
import useForm from '../hooks/useForm';

const formKeys = {
  text: 'text',
};

export default function MovieDetails() {

  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieComments, setMovieComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [exists, setExists] = useState([]);
  const { userId, username, isAuth } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);

    getOneMovie(id).then(setMovieDetails);

    getCurrentMovieComments(id).then(setMovieComments);

    getCurrentUserWatchlist(userId)
      .then(setExists)
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addToWatchlistHandler = async () => {
    await addToWatchlist(movieDetails, userId);
    getCurrentUserWatchlist(userId).then(setExists);
  };

  const addCommentHandler = async (inputs) => {
    await addComment(username, inputs, movieDetails.title, id);
    getCurrentMovieComments(id).then(setMovieComments);
    inputs[formKeys.text] = '';
  };

  const initialMovieComments = useMemo(
    () => ({
      [formKeys.text]: '',
    }),
    []
  );

  const { inputs, onChangeInput, submitForm } = useForm(
    addCommentHandler,
    initialMovieComments
  );
  
  const movieIsInWatchlist = exists.some((comment) => comment.id == id);

  return (
    <>
      <h1>Movie Details</h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className='movie-details-container' id={movieDetails.id}>
            <img
              className='movie-details-img'
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                  : null
              }
              alt='Poster not avaible'
            />
            <div className='movie-details-info'>
              <p>
                <span>Title:</span> {movieDetails.title}
              </p>
              <p>
                <span>Genres:</span>{' '}
                {movieDetails.genres?.map((e) => e.name + ', ')}
              </p>
              <p>
                <span>Homepage:</span> {movieDetails.homepage}
              </p>
              <p>
                <span>Link to: </span>{' '}
                <Link
                  to={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
                  target='blank'
                >
                  {' '}
                  IMDB
                </Link>
              </p>
              <p>
                <span>Overview:</span> {movieDetails.overview}
              </p>
              <p>
                <span>Durution:</span> {movieDetails.runtime} min.
              </p>
              <p className='prodCompanies'>
                <span>Production Companies:</span>{' '}
                {movieDetails.production_companies?.map((e) => (
                  <img
                    key={e.name}
                    src={
                      e.logo_path
                        ? `https://image.tmdb.org/t/p/w500${e.logo_path}`
                        : null
                    }
                    alt={e.name}
                  />
                ))}
              </p>
              <p>
                <span>Relese Date:</span> {movieDetails.release_date}
              </p>
              <p>
                <span>Vote Average:</span>{' '}
                <b>{Number(movieDetails.vote_average).toFixed(2)}</b> /10
              </p>
            </div>
            {isAuth && (
              <div className='movie-details-btns'>
                {!movieIsInWatchlist && (
                  <>
                    <p>Add to watchlist</p>
                    <button
                      type='button'
                      onClick={addToWatchlistHandler}
                      className='add-to-watchlist-btn'
                    >
                      <svg
                        className='icon-add-to-watchlist'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                      >
                        <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z' />
                      </svg>
                    </button>
                  </>
                )}
                {movieIsInWatchlist && (
                  <>
                    <p>Added!</p>
                    <svg
                      className='added'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 576 512'
                    >
                      <path d='M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z' />
                    </svg>
                  </>
                )}
              </div>
            )}
          </div>
          {!movieComments.length == 0 ? (
            <div className='movie-comments-container'>
              <h4>Comments</h4>
              <ul className='comments'>
                {movieComments.map((c) => (
                  <li key={c._id} id={c._id}>
                    <p className='comment-p'>
                      <span>User:</span> {c.username}
                    </p>
                    <p className='comment-p'>
                      <span>Created on:</span> {formatDate(c._createdOn)}
                    </p>

                    <hr />
                    <p className='comment'>
                      <span>Comment:</span> {c.comment}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className='movie-comments-container'>
              <h4>Comments</h4>
              <div className='no-comments'>
                <p>This movie has not been commented yet.</p>
              </div>
            </div>
          )}
          {isAuth && (
            <div className='add-comment'>
              <form className='form' onSubmit={submitForm}>
                <textarea
                  type='text'
                  name={formKeys.text}
                  value={inputs[formKeys.text]}
                  onChange={onChangeInput}
                  placeholder='Comment......'
                />
                <input
                  className='btn-submit'
                  type='submit'
                  value='Add Comment'
                />
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
}
