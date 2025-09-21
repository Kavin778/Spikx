import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import CastCard from './CastCard';
import CastList from './CastList';

const MovieInfo = ({ movieData, isWatchParty, onEnableChat, isChatEnable }) => {
  const posterbaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const moviePosterUrl = `${posterbaseUrl}${movieData.posters[0].file_path}`;
  return (
    <div className="mx-6 h-auto p-4 flex items-start gap-6">
      <div className="flex-shrink-0 w-96 rounded-lg overflow-hidden">
        <img src={moviePosterUrl} alt={movieData.title} className="w-full object-cover" />
      </div>
      <div className="flex-1 p-2 overflow-hidden">
        <div className="flex items-center mb-6">
          <h1 className="text-5xl font-bold text-white uppercase">{movieData.title}</h1>
          {isWatchParty ?isChatEnable ? (
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
          ) : null}
        </div>
        <div className="flex-1 text-white text-lg font-medium space-y-6">
          <div className="flex items-start space-x-2 text-lg ">
            <span className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointer">
              {movieData.year}
            </span>
            <span className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointer">
              ★ {movieData.rating}
            </span>
            <span className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointer capitalize">
              {movieData.mediaType}
            </span>
            <span className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointer">
              1080p
            </span>
          </div>
          <div className="flex items-start space-x-2 text-lg">
            {movieData.genres.map(genre => (
              <span
                key={genre.id}
                className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointe"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <span className="bg-slate-400 py-0.5 px-3 rounded-md hover:bg-slate-200 hover:text-black cursor-pointer">
            {Math.floor(movieData.duration / 60)}h {movieData.duration % 60}m
          </span>
          <p className="text-lg leading-relaxed mt-4 font-semibold">{movieData.overview}</p>
          <div className="flex-1 space-y-4 max-w-full overflow-hidden">
            <CastList cast={movieData.cast} title="CastMembers" />
            <CastList cast={movieData.crew} title="CrewMembers" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
