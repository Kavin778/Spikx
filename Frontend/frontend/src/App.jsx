import { BrowserRouter, useLocation } from 'react-router-dom';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { AuthProvider } from './context/AuthContext';
import RoutePaths from './routes/RoutePaths';

const AppContent =()=>{
  const location = useLocation();

  const hideNavbar = location.pathname ==="/"||location.pathname==="/register" || location.pathname==="*";

  return(
    <>
    {!hideNavbar && <Navbar/>}
    <RoutePaths/>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
