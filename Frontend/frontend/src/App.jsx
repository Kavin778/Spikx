import Sidebar from "./components/Sidebar"
import VideoPlayer from "./components/VideoPlayer";
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage";

function App() {

  return (
    <div className="bg-black">
      <Sidebar />
      {/* <main>
        <HomePage />
      </main> */}
      <MoviePage/>
    </div>
  );
}

export default App
