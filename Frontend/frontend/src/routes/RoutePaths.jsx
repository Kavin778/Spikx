import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import ProtectedRoute from './ProtectedRoutes';
import HomePage from '../pages/HomePage';
import MoviePage from '../pages/MoviePage';
import ErrorPage from '../pages/ErrorPage';
import WatchPartyPage from '../pages/WatchPartyPage';
import RoomCard from '../components/RoomCard';
import RoomInfo from '../components/RoomInfo';

const RoutePaths = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage isLogin={true} />} />
      <Route path="/register" element={<AuthPage isLogin={false} />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movie/:tmdbId"
        element={
          <ProtectedRoute>
            <MoviePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
      <Route path='/watchparty' element={<WatchPartyPage/>}/>
      <Route path='/card' element={<RoomCard/>}/>
      <Route path='/roomInfo' element={<RoomInfo/>}/>
    </Routes>
  );
};

export default RoutePaths;
