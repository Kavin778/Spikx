import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage";

function App() {

  return (
    <div className="bg-white min-h-screen">
      {/* <Navbar /> */}
      {/* <main>
        <HomePage />
      </main> */}
      {/* <MoviePage/> */}
      {/* <Chat /> */}
      <AuthPage/>
    </div>
  );
}

export default App
