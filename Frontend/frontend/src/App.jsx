import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage";

function App() {

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      {/* <main>
        <HomePage />
      </main> */}
      <MoviePage/>
      {/* <Chat /> */}
    </div>
  );
}

export default App
