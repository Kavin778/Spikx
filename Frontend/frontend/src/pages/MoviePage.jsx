import { useEffect, useState } from 'react';
import MovieInfo from '../components/MovieInfo';
import VideoPlayer from '../components/VideoPlayer';
import { getMovieDetails } from '../api/MoviesService';
import { useParams, useSearchParams } from 'react-router-dom';
import Chat from '../components/Chat';
import socketService from '../api/SocketService';
import {useAuth} from "../hooks/useAuth"
import { getRoomDetails } from '../api/RoomService';

const MoviePage = () => {
  const [isChatEnabled, setIsChatEnabled] = useState(false);
  const { tmdbId } = useParams();
  const [searchParams] = useSearchParams();
  const watchParty = searchParams.get('watchParty') === 'true';
  const {roomId} = useParams()
  const {user} = useAuth();
  const {username} = user || "Anonymous";

  const [isHost,setIsHost] = useState(false);

  useEffect(() => {
    if (watchParty && roomId && user?.id) {
      const checkHostStatus = async () => {
        try {
          const roomDetails = await getRoomDetails(roomId);
          if (roomDetails && roomDetails.creator.id === user.id) {
            setIsHost(true);
          }
        } catch (error) {
          console.error('Failed to fetch room details or user is not the host', error);
        }
      };
      checkHostStatus();
    }
  }, [roomId, user, watchParty]);

  const handleChatEnable = enabled => {
    setIsChatEnabled(enabled);
  };

  const [movieDetails, setMovieDetails] = useState(null);

  if(watchParty && roomId){
    useEffect(() => {
      const sockerurl = import.meta.env.VITE_SOCKET_BASE_URL;
      socketService.connect(sockerurl);
      socketService.joinRoom(roomId, username);

      return () => {
        socketService.disconnect();
      };
    }, [watchParty, roomId, username]);
  }

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await getMovieDetails(tmdbId);
      setMovieDetails(details);
    };
    fetchMovieDetails();
  }, [tmdbId]);

  if (!movieDetails) {
    return (
      <div className="bg-black min-h-screen flex justify-center items-center">
        <p className="text-white text-xl font-bold">...Loading...</p>;
      </div>
    );
  }

  const videoDetails = {
    id: movieDetails.movieId,
    tagline: movieDetails.details.tagline,
    logos: movieDetails.logos,
    backdrops: movieDetails.backdrops,
    title: movieDetails.details.title,
  };

  const movieInfos = {
    title: movieDetails.details.title,
    year: movieDetails.details.release_date.slice(0, 4),
    rating: movieDetails.details.vote_average.toFixed(1),
    overview: movieDetails.details.overview,
    vote_count: movieDetails.details.vote_count,
    genres: movieDetails.details.genres,
    posters: movieDetails.posters,
    cast: movieDetails.cast,
    crew: movieDetails.crew,
    mediaType: movieDetails.mediaType,
    duration: movieDetails.details.runtime,
  };

  return (
    <div className="min-h-screen bg-black ">
      <div className="flex h-[86vh]">
        <div className={`transition-all duration-300 ${isChatEnabled ? 'w-[70%]' : 'w-full'}`}>
          <VideoPlayer isChatVisible={isChatEnabled && watchParty} movieData={videoDetails} roomId={roomId} isHost={isHost}/>
        </div>
        {isChatEnabled &&(
          <div className="w-[30%] px-6 py-1 transition-all duration-300">
            <Chat username={username}/>
          </div>
        )}
      </div>
      <div>
        <MovieInfo
          movieData={movieInfos}
          isWatchParty={watchParty}
          onEnableChat={handleChatEnable}
          isChatEnable={isChatEnabled}
        />
      </div>
    </div>
  );
};

export default MoviePage;
