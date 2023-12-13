import { useContext } from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/movie_logo.png';
import Clock from './Clock';
import AuthContext from '../context/authContext';

export default function Navbar() {

  const { isAuth, username } = useContext(AuthContext);
  
  return (
    <div className='navbar'>
      <div className='background'>
        <div className='background-image'></div>
      </div>
      <div className='navbar-main'>
        <div className='logo'>
          <img className='logo_png' src={logo} />
          <span className='logo-text'>The Movie Site</span>
        </div>
        <ul className='top-navbar-btns'>
          <li>
            <Link to='/'>
              <button className='nav-btn'>
                <span>Home</span>
                <i></i>
              </button>
            </Link>
          </li>
          <li>
            <Link to='search'>
              <button className='nav-btn'>
                <span>Search</span>
                <i></i>
              </button>
            </Link>
          </li>
          <li>
            <Link to='catalog'>
              <button className='nav-btn'>
                <span>Catalog</span>
                <i></i>
              </button>
            </Link>
          </li>
          <li>
            <Link to='nowplaying'>
              <button className='nav-btn'>
                <span>Now Playing</span>
                <i></i>
              </button>
            </Link>
          </li>
        </ul>

        <div className='user-btns'>
          {isAuth && (
            <div className='user'>
              <span className='welcome'>Welcome: {username} !</span>
              <Link to='/profile' className='profile'>
                Profile
              </Link>
              <Link to='/logout' className='logout'>
                Logout
              </Link>
            </div>
          )}
          {!isAuth && (
            <div className='guest'>
              <Link to='login' className='login'>
                Log in
              </Link>
              <Link to='signup' className='sign-up'>
                Sign up
              </Link>
            </div>
          )}
          <Clock />
        </div>
      </div>
    </div>
  );
}
