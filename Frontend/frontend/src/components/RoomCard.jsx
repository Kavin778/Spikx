import { useNavigate } from 'react-router-dom';
import HollowKnight from '../assets/HollowKnight.png';
import {EyeIcon,EyeSlashIcon,InformationCircleIcon,UserGroupIcon,} from '@heroicons/react/16/solid';


const RoomCard = ({ onInfoClick }) => {
  const isPublic = true;
  const roomData = {
    title: 'SUPERMAN',
    type: 'Movie',
    description: 'fafadknvavkvn  hauvdhnvfajn  ajnvdd dvnkjdnvKJ DIN NVINA V IDVB IVI J ISDV',
    creator: 'KAVIN',
  };
  const navigate = useNavigate()
  const handleInfoClick = () => {
    onInfoClick(roomData);
  };

  const handleJoinRoom=()=>{
    navigate(`/movie/157336/${roomData.id}?watchParty=true`);
  }
  return (
    <div className="relative w-64 h-96 bg-red-100 rounded-lg group z-20 overflow-hidden">
      <img src={HollowKnight} alt="title" className="w-full h-full object-cover" />
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
        <button onClick={handleJoinRoom} className="bg-slate-400 hover:bg-slate-200 hover:cursor-pointer hover:text-black group text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-colors duration-300">
          <UserGroupIcon className="size-6 inline-block hover:text-black transition-all duration-300" />
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
