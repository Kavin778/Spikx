import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage";

function App() {

  return (
    <div className="bg-black min-h-screen">
      <Navbar/>
      {/* <main>
        <HomePage />
      </main> */}
      <MoviePage/>
    </div>
  );
}

export default App
