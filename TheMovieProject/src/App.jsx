import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/authContext';

import Footer from '../compoments/Footer';
import Navbar from '../compoments/NavBar';
import Login from '../compoments/Login';
import SignUp from '../compoments/SignUp';
import Catalog from '../compoments/Catalog';
import HomePage from '../compoments/HomePage';
import NowPlaying from '../compoments/NowPlaying';
import Search from '../compoments/Search';
import Profile from '../compoments/Profile';
import MovieDetails from '../compoments/MovieDetails';
import NotFound from '../compoments/NotFound';
import Logout from '../compoments/Logout';
import EditComment from '../compoments/EditComment';
import Guard from '../guards/Guards';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className='main-container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/nowplaying' element={<NowPlaying />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/moviedetails/:id' element={<MovieDetails />} />
          <Route element={<Guard />}>
            <Route path='/search' element={<Search />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/editcomment/:id' element={<EditComment />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
