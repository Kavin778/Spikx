import React from 'react';
import { PlayIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';

const Moviecard = ({movieData}) => {
    const imageUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL + movieData.poster_path;
    const navigate = useNavigate();

    const handlePlayClick =()=>{
      navigate(`/movie/${movieData.id}?watchParty=false`)
    }
  return (
    <div className="flex-shrink-0 w-64 h-86 cursor-pointer bg-white rounded-md overflow-hidden m-2 relative items-center group hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:z-10">
      <img
        src={imageUrl}
        alt={movieData.title || movieData.name}
        className="w-full h-full object-cover rounded-md group-hover:brightness-75"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={handlePlayClick} className="bg-slate-400 cursor-pointer hover:bg-slate-200 hover:text-black group text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-colors duration-200">
          <PlayIcon className="size-5 inline-block hover:text-black transition duration-200" />
          Play Now
        </button>
      </div>
    </div>
  );
};

export default Moviecard;
