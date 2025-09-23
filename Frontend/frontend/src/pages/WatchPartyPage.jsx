import { PlusIcon } from '@heroicons/react/24/outline';
import RoomCard from '../components/RoomCard';
import RoomInfo from '../components/RoomInfo';
import { useState } from 'react';

const WatchPartyPage = () => {
  const [isRoomInfo, setIsRoomInfo] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomInfoOpen = roomData => {
    setSelectedRoom(roomData);
    setIsRoomInfo(true);
  };

  const handleRoomInfoClose = () => {
    setIsRoomInfo(false);
    setSelectedRoom(null);
  };
  return (
    <div className="bg-black  min-h-screen w-full pt-20">
      <div className={`${isRoomInfo ? `blur-sm` : ''} transition-all duration-300`}>
        <div className="h-auto w-full flex flex-row justify-start items-center px-12 py-8">
          <div className="w-32 h-32 rounded-xl flex justify-center items-center group border-2 bg-slate-400 hover:bg-slate-200 transition-all duration-300 cursor-pointer flex-shrink-0">
            <PlusIcon className="size-16 text-slate-200 group-hover:text-black transition-all duration-300" />
          </div>
          <div className="flex-1 ml-8 flex flex-col justify-start space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-200">
              Welcome To WatchParty!
            </h1>
            <p className="text-xl md:text-2xl font-bold text-slate-200 leading-relaxed">
              Here you can create or join rooms to watch movies and shows together with your friends
              and family, no matter where you are.
            </p>
            <p className="text-slate-300 text-lg font-semibold">
              (Click the plus [+] icon to create a room)
            </p>
          </div>
        </div>
        <div className="h-px bg-slate-600 mx-12 my-8"></div>
        <div className="w-full px-12 ">
          <h1 className="text-4xl text-slate-200 font-extrabold mb-1">Available Rooms</h1>
          <div className="grid grid-cols-6 gap-y-8 mt-4">
            <RoomCard onInfoClick={handleRoomInfoOpen} />
            <RoomCard onInfoClick={handleRoomInfoOpen} />
            <RoomCard onInfoClick={handleRoomInfoOpen} />
            <RoomCard onInfoClick={handleRoomInfoOpen} />
          </div>
        </div>
      </div>

      {isRoomInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div onClick={handleRoomInfoClose} className='absolute inset-0 bg-black/50 backdrop-blur-sm'></div>
            <RoomInfo roomData={selectedRoom} onClose={handleRoomInfoClose}/>
        </div>
      )}
    </div>
  );
};

export default WatchPartyPage;
