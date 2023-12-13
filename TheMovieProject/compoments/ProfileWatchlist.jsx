import { useContext, useEffect, useState } from 'react';

import Card from './Card';
import { deleteFromWatchlist } from '../services/watchlistService';
import { getCurrentUserWatchlist } from '../services/watchlistService';
import AuthContext from '../context/authContext';

export default function ProfileWatchlist() {
  const { userId } = useContext(AuthContext);
  const [currentUserWatchlist, setCurrentUserWatchlist] = useState({});

  useEffect(() => {
    getCurrentUserWatchlist(userId).then(setCurrentUserWatchlist);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFromWatchlist = (e, id) => {
    e.preventDefault();
    deleteFromWatchlist(id);
    setCurrentUserWatchlist(currentUserWatchlist.filter((m) => m._id !== id));
  };

  return (
    <>
      {!currentUserWatchlist.length == 0 ? (
        <>
          {currentUserWatchlist?.map((m) => (
            <Card
              key={m._id}
              id={m.id}
              title={m.title}
              relDate={m.release_date}
              image={'https://image.tmdb.org/t/p/w500/' + m.poster_path}
              vote={m.vote_average}
              remove={(e) => removeFromWatchlist(e, m._id)}
              isProfile='true'
            />
          ))}
        </>
      ) : (
        <div className='no-comments'>
          <p>You have no movies in your watchlist.</p>
        </div>
      )}
    </>
  );
}
