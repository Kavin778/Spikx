import { useState } from 'react';
import MovieSelector from './MovieSelector';
import { createRoom } from '../api/RoomService';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const CreateRoom = ({onClose}) => {
  const [isPublic, setIsPublic] = useState(true);
  const [isMovieSelectorOpen, setIsMovieSelectorOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    password: '',
  });
  const {user} = useAuth()
  const navigate = useNavigate();

  const handleMovieSelect = movie => {
    setSelectedMovie(movie);
    setFormData(prev => ({
      ...prev,
    }));
    setIsMovieSelectorOpen(false);
  };

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:value,
    }));
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const form = {
        ...formData,
        isPublic: isPublic,
        creatorId: user.id,
        currentMovieId: selectedMovie.id
      };
       const response = await createRoom(form)
       navigate(`/movie/${selectedMovie.tmdbId}/${response.id}?watchParty=true`);
    }
    catch(error){
      console.error("Error creating room")
    }
  }

  const posterUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL
  return (
    <div className="flex justify-center flex-col space-y-2 w-2xl text-white h-auto bg-gray-800 z-50 rounded-2xl transition-all duration-300 ">
      <h1 className="text-4xl font-bold text-white px-4 py-2 ">Create Room</h1>
      <div className="h-full w-full border-t border-t-white">
        <form className="flex flex-col space-y-2 p-4">
          <label className="text-xl w-[20%] font-bold ">Room Name</label>
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter room name..."
              name='name'
              value={formData.name}
              onChange={handleChange}
              className="w-full text-black bg-white border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <label className="text-xl w-[20%] font-bold">Description</label>
          <div className="w-full">
            <textarea
              type="text"
              placeholder="Enter room's code of conduct"
              name='description'
              value={formData.description}
              onChange={handleChange}
              className="w-full text-black bg-white border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
              rows={4}
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="w-[40%] flex flex-col space-y-2">
              <label className="text-xl font-bold">Room Type</label>
              <div className="flex flex-row  items-center gap-x-4">
                <div>
                  <button
                    type="button"
                    onClick={() => setIsPublic(!isPublic)}
                    className={`relative cursor-pointer inline-flex  h-9 w-18 items-center rounded-full transition-colors duration-300 ${isPublic ? 'bg-blue-500' : 'bg-red-500'}`}
                  >
                    <span
                      className={`h-7 w-7 inline-block rounded-full bg-white transform transition-transform duration-300 ${isPublic ? 'translate-x-1' : 'translate-x-10'}`}
                    ></span>
                  </button>
                </div>
                <div className="space-x-4">
                  <span
                    className={`text-lg font-semibold cursor-pointer  ${isPublic ? 'text-blue-500' : 'text-white'}`}
                    onClick={() => setIsPublic(true)}
                  >
                    Public
                  </span>
                  <span
                    className={`text-lg font-semibold cursor-pointer ${isPublic ? 'text-white-' : 'text-red-500'}`}
                    onClick={() => setIsPublic(false)}
                  >
                    Private
                  </span>
                </div>
              </div>
            </div>
            {!isPublic && (
              <div className="animate-fadeIn w-[60%]">
                <label className="text-xl font-bold block">Room Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter room password..."
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-black bg-white border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required={!isPublic}
                />
              </div>
            )}
          </div>
          <label className="text-xl font-bold">Select Movie</label>
          <div className="w-full">
            {selectedMovie ? (
              <div className="flex items-center p-3 bg-gray-700 rounded-lg border">
                <img
                  src={posterUrl + selectedMovie.poster[0]}
                  className="w-12 h-16 object-contain rounded mr-3"
                />
                <div className="flex-1">
                  <h4 className="text-white font-medium">{selectedMovie.title}</h4>
                  <p className="text-gray-400 text-sm"></p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMovieSelectorOpen(true)}
                  className="bg-blue-500 hover:bg-slate-200 hover:text-black text-white px-4 py-2 rounded-md hover:shadow-lg transition-colors duration-300"
                >
                  Change
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsMovieSelectorOpen(true)}
                className="w-full bg-gray-600 hover:bg-slate-200 hover:text-black text-white font-semibold py-3 px-4 rounded-md transition-colors duration-300"
              >
                Select Movie
              </button>
            )}
          </div>
          <div className="flex justify-center space-x-4 py-2  text-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 cursor-pointer w-full bg-gray-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Close
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 w-full cursor-pointer bg-blue-500 hover:bg-slate-200 hover:text-black text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>

      {isMovieSelectorOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMovieSelectorOpen(false)}
          ></div>
          <MovieSelector
            onClose={() => setIsMovieSelectorOpen(false)}
            onSelectMovie={handleMovieSelect}
          />
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
