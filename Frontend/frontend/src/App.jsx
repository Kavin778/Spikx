import { BrowserRouter } from 'react-router-dom';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { AuthProvider } from './context/AuthContext';
import RoutePaths from './routes/RoutePaths';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <RoutePaths />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
