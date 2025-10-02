import { XMarkIcon, ArrowLeftStartOnRectangleIcon,UserGroupIcon } from '@heroicons/react/16/solid';


const RoomInfo = ({roomData,onClose}) => {
  const isPublic = roomData.isPublic;
  const posterUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL + roomData.currentMovie.poster[0];

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col w-4xl z-10 h-[57vh] bg-gray-700 rounded-xl">
        <div className="flex w-full h-auto justify-between">
          <h1 className="text-4xl p-4  font-bold text-white line-clamp-1">{roomData.creator.username}'s WatchParty</h1>
          <XMarkIcon onClick={onClose} className="size-10 m-3 text-white hover:text-red-600 hover:cursor-pointer" />
        </div>
        <div className="w-full h-full flex rounded-b-xl p-3 ">
          <div className="w-72 h-full rounded-lg">
            <img
              src={posterUrl}
              alt="MovieTitle"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 w-full h-full ml-2">
            <div className="flex flex-col w-full h-auto space-y-3 p-4">
              <h1 className="text-4xl font-bold text-white">{roomData.currentMovie.title}</h1>
              <span
                className={`text-lg font-semibold w-fit py-0.5 px-1 rounded-md ${isPublic ? 'bg-blue-500' : 'bg-red-600'} text-white`}
              >
                Private Room
              </span>
              <div className="space-x-3">
                <span className="text-md font-semibold w-fit py-0.5 px-1 text-white bg-slate-400 rounded-md">
                  Movie
                </span>
                <span className="text-md font-semibold w-fit py-0.5 px-1 text-white bg-slate-400 rounded-md">
                  Movie
                </span>
                <span className="text-md font-semibold w-fit py-0.5 px-1 text-white bg-slate-400 rounded-md">
                  Movie
                </span>
              </div>
              <p className="text-lg font-semibold text-white line-clamp-4">
                Rules :{roomData.description}
              </p>
              <span className="text-lg font-semibold text-white">Members Online:</span>
              <span className="text-lg font-semibold text-white">Created at: {roomData.createdAt.slice(0,10)}</span>
            </div>
            <div className="flex flex-row justify-center items-center p-1 gap-6 mt-22 w-full h-auto">
              <button onClick={onClose} className="bg-slate-400 text-3xl flex justify-center items-center group hover:bg-red-600 hover:cursor-pointer text-white p-2 w-64 rounded-lg transition-all duration-300">
                <ArrowLeftStartOnRectangleIcon className="size-8 text-white mr-2 transition-all duration-300" />
                Close
              </button>
              <button className="bg-slate-400 text-3xl text-white group flex justify-center items-center hover:text-black hover:bg-slate-200 p-2 w-64 rounded-lg hover:cursor-pointer transition-all duration-300">
                <UserGroupIcon className="size-8 group-hover:text-black transition-all duration-300" />
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
