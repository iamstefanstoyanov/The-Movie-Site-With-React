/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/authContext';

export default function Card({
  id,
  title,
  relDate,
  description,
  image,
  vote,
  remove,
  isProfile,
}) {

  const { isAuth } = useContext(AuthContext);
  
  return (
    <div className='card' key={id}>
      <img src={image} alt='Not Poster Available' />
      <h5>{title}</h5>
      <p className='relDate'>
        <span>Release Date:</span> {relDate}
      </p>
      <p>
        <span>Average Vote:</span> <b>{Number(vote).toFixed(2)}</b> /10
      </p>
      {description ? (
        <p className='description'>
          <span>Description:</span> {description}
        </p>
      ) : null}
      <div className='card-btns'>
        <Link to={`/moviedetails/${id}`}>
          <button className='card-btn' type='button'>
            <span>More details</span>
          </button>
        </Link>
        {isAuth && isProfile ? (
          <button className='card-btn' type='button' onClick={remove}>
            <span>Remove</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
