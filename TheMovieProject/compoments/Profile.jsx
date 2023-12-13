import { useContext } from 'react';

import ProfileComments from './ProfileComments';
import ProfileWatchlist from './ProfileWatchlist';

import AuthContext from '../context/authContext';

import { formatDate } from '../utils/dataUtils';

export default function Profile() {
  
  const { username, email, imgUrl,registeredOn } = useContext(AuthContext);
  
  return (
    <div className='profile-container'>
      <div className='main-profile-info'>
        <div className='profile-picture'>
          <img src={imgUrl} alt='No Picture' />
        </div>
        <div className='profile-info'>
          <p>
            <span>Username:</span> {username}
          </p>
          <p>
            <span>Email:</span> {email}
          </p>
          <p>
            <span>Registerd on:</span> {formatDate(registeredOn)}
          </p>
        </div>
      </div>
      <div className='profile-watchlist'>
        <h4>My watchlist</h4>
        <div className='profile-watchlist-cards'>
          <ProfileWatchlist />
        </div>
      </div>
      <div className='movie-comments-container'>
        <h4>My comments</h4>
        <ul className='comments'>
          <ProfileComments />
        </ul>
      </div>
    </div>
  );
}
