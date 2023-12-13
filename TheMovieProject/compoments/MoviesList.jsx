import { Link } from 'react-router-dom';

export default function MoviesList({
  id,
  title,
  relDate,
  description,
  image,
  vote,
}) {
  return (
    <div className='movies-list-wrap' key={id} id={id}>
      <div className='poster'>
        <img className='poster-small' src={image} alt='Poster not avaible' />
      </div>
      <div className='movie-info'>
        <p>
          <span>Title:</span> {title}
        </p>
        <p>
          <span>Release Date:</span> {relDate}
        </p>
        <p>
          <span>Description:</span> {description}
        </p>
        <p>
          <span>Average Vote:</span> <b>{Number(vote).toFixed(2)}</b> /10
        </p>
      </div>
      <Link to={`/moviedetails/${id}`}>
        <button className='card-btn' type='button'>
          <span>More details</span>
        </button>
      </Link>
    </div>
  );
}
