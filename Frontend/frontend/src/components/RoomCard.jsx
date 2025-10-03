import { useNavigate } from 'react-router-dom';
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/16/solid';
import { joinRoom } from '../api/RoomService';

const RoomCard = ({ roomData, onInfoClick }) => {
  const isPublic = roomData.isPublic;

  const navigate = useNavigate();
  const handleInfoClick = () => {
    onInfoClick(roomData);
  };

  const tmdbId = roomData.currentMovie.tmdbId;

  const handleJoinRoom = async () => {
    if(!isPublic){
      const response = await joinRoom(roomData);
      if(response.success){
        navigate(`/movie/${tmdbId}/${roomData.id}?watchParty=true`);
      }
      else{
        console.error("Failed to join room ")
      }
    }
    else{
      navigate(`/movie/${tmdbId}/${roomData.id}?watchParty=true`);
    }
  };

  const posterUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL + roomData.currentMovie.poster[0];
  return (
    <div className=' w-64 rounded-lg h-auto'>
      <h1 className="text-2xl font-bold text-slate-200 text-start line-clamp-1">Creator: {roomData.creator.username}</h1>
      <div className="relative w-64 h-96 rounded-lg group z-20 overflow-hidden">
        <img src={posterUrl} alt="title" className="w-full h-full object-cover" />
        <div className="absolute w-full h-full inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <InformationCircleIcon
          onClick={handleInfoClick}
          className="absolute top-2 left-2 size-8 hover:cursor-pointer text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-300"
        />
        {isPublic ? (
          <EyeIcon className="absolute top-2 right-2 size-8 hover:cursor-pointer text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        ) : (
          <EyeSlashIcon className="absolute top-2 right-2 size-8 hover:cursor-pointer text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleJoinRoom}
            className="bg-slate-400 hover:bg-slate-200 hover:cursor-pointer hover:text-black group text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-colors duration-300"
          >
            <UserGroupIcon className="size-6 inline-block hover:text-black transition-all duration-300" />
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
