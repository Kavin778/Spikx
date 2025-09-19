import { useEffect, useState } from 'react';
import MovieInfo from '../components/MovieInfo';
import VideoPlayer from '../components/VideoPlayer';
import { getMovieDetails } from '../api/MoviesService';

const MoviePage = ({ tmdbId = 91314 }) => {
  const [isChatEnabled, setIsChatEnabled] = useState(false);

  const handleChatEnable = enabled => {
    setIsChatEnabled(enabled);
  };

  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await getMovieDetails(tmdbId);
      setMovieDetails(details);
    };
    fetchMovieDetails();
  }, [tmdbId]);

  if (!movieDetails) {
    return (
      <div className="min-h-screen flex justify-center items-center">
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
    <div className="min-h-screen bg-black space-y-2">
      <VideoPlayer isChatVisible={isChatEnabled} movieData={videoDetails} />
      <div>
        <MovieInfo
          movieData={movieInfos}
          isWatchParty={true}
          onEnableChat={handleChatEnable}
          isChatEnable={isChatEnabled}
        />
      </div>
    </div>
  );
};

export default MoviePage;
