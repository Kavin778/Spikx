import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import CastCard from "./CastCard";
import CastList from "./CastList";

const MovieInfo = ({movieData,isWatchParty,onEnableChat,isChatEnable}) => {
  return (
    <div className="mx-6 h-screen p-4 flex items-start gap-6">
      <div className="flex-shrink-0 w-96 rounded-lg overflow-hidden">
        <img
          src="https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
          alt=""
          className="w-full object-cover"
        />
      </div>
      <div className="flex-1 p-2 overflow-hidden">
        <div className="flex items-center mb-6">
          <h1 className="text-5xl font-bold z-50 text-white uppercase">INTERSTELLAR</h1>
          {isWatchParty && isChatEnable ? (
            <button
              onClick={() => onEnableChat?.(false)}
              className="bg-slate-400 hover:bg-slate-200 ml-8 hover:text-black text-white font-bold py-2 px-6  rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <ChatBubbleLeftRightIcon className="size-6 hover:text-black inline-block" />
              Disable Chat
            </button>
          ) : (
            <button
              onClick={() => onEnableChat?.(true)}
              className="bg-slate-400 hover:bg-slate-200 ml-8 hover:text-black text-white font-bold py-2 px-6  rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <ChatBubbleLeftRightIcon className="size-6 hover:text-black inline-block" />
              Enable Chat
            </button>
          )}
        </div>
        <div className="flex-1 text-white text-lg font-medium space-y-6">
          <div className="flex items-start space-x-2 text-lg ">
            <span className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointer">2015</span>
            <span className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointer">★ 7.7</span>
            <span className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointer">Movie</span>
            <span className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointer">1080P</span>
          </div>
          <div className="flex items-start space-x-2 text-lg">
            <span className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointe">Adeventue</span>
            <span className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointe">Space</span>
          </div>
          <p className="text-lg leading-relaxed font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo, at recusandae
            illo cupiditate ipsam, officiis distinctio cum eaque doloribus doloremque expedita unde,
            illum mollitia perspiciatis sequi magnam! Eveniet, ipsam!
          </p>
          <div className="flex-1 space-y-6 max-w-full overflow-hidden">
            <CastList cast={[1, 2, 3, 4, 5, 6, 2, 22, 2, 2, 2, 2]} title="CastMembers" />
            <CastList cast={[1, 2, 3, 4, 5, 6,4,4,44,4,4,44,4,4,]} title="CrewMembers" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
