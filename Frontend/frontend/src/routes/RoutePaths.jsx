import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import ProtectedRoute from './ProtectedRoutes';
import HomePage from '../pages/HomePage';
import MoviePage from '../pages/MoviePage';
import ErrorPage from '../pages/ErrorPage';

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
        path="/movie"
        element={
          <ProtectedRoute>
            <MoviePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutePaths;
