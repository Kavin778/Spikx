import { useEffect, useState } from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { getAllMovies } from '../api/MoviesService';

const MovieSelector = ({ onClose, onSelectMovie }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const[movies,setMovies] = useState([])

  useEffect(()=>{
    const fetchAllMovies = async() =>{
        const movies = await getAllMovies();
        setMovies(movies);
    }
    fetchAllMovies();
  },[])

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMovieSelect = movie => {
    onSelectMovie(movie);  
    onClose()
  };
  const posterUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

  return (
    <div className="w-full max-w-6xl h-[85vh] bg-gray-800 rounded-xl p-6 relative z-70">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Select a Movie</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 text-lg"
        />
      </div>

      {/* Movies Grid */}
      <div className="overflow-y-auto p-3 h-auto ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              className="bg-gray-700 rounded-lg p-3 hover:bg-gray-600  transition-all duration-300 transform hover:scale-105 group"
            >
              <h3 className="text-white text-center font-medium text-lg mb-1 line-clamp-2  ">{movie.title}</h3>
              {/* Movie Poster */}
              <div className="aspect-[2/3] bg-gray-600 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                <img
                  src={posterUrl + movie.poster[0]}
                  alt={movie.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <div className="w-full h-full bg-gray-600 rounded-lg items-center justify-center text-gray-400 text-sm hidden">
                  No Image
                </div>
              </div>

              {/* Movie Info */}
              <div className="text-center">
                <button
                  onClick={() => handleMovieSelect(movie)}
                  className="w-full bg-blue-600 cursor-pointer hover:bg-slate-200 hover:text-black text-white font-semibold py-2 px-3 rounded-md transition-colors duration-300 text-sm"
                >
                  Select Movie
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No movies found</p>
            <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSelector;
