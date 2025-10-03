import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import ProtectedRoute from './ProtectedRoutes';
import HomePage from '../pages/HomePage';
import MoviePage from '../pages/MoviePage';
import ErrorPage from '../pages/ErrorPage';
import WatchPartyPage from '../pages/WatchPartyPage';
import PasswordPrompt from '../components/PasswordPrompt';

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
      <Route
        path="/movie/:tmdbId/:roomId"
        element={
          <ProtectedRoute>
            <MoviePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchparty"
        element={
          <ProtectedRoute>
            <WatchPartyPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/password" element={<PasswordPrompt/>}/>
    </Routes>
  );
};

export default RoutePaths;
