import { PlayIcon } from '@heroicons/react/16/solid';
import { getMovieImages, getMovieGenres } from '../api/MoviesService';
import { useEffect, useState } from 'react';

const HeroBanner = ({ movieData }) => {
  const [logoPath, setLogoPath] = useState(null);
  const [genres, setGenres] = useState([]);
  const backdropPath = import.meta.env.VITE_TMDB_ORIGINAL_IMAGE_BASE_URL + movieData.backdrop_path;

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        if (movieData && movieData.id) {
          const logos = await getMovieImages(movieData.id, movieData.media_type);
          const getgenres = await getMovieGenres(movieData.media_type);
          setGenres(getgenres);
          if (logos.length > 0) {
            const enLogo = logos.find(logo => logo.iso_639_1 === 'en');
            setLogoPath(import.meta.env.VITE_TMDB_ORIGINAL_IMAGE_BASE_URL + enLogo.file_path);
          } else {
            setLogoPath(null);
          }
        }
      } catch (error) {
        console.error('Error fetching logos:', error);
        setLogoPath(null);
      }
    };
    fetchLogos();
  }, [movieData?.id]);
  const genreMap = new Map(genres.map(g => [g.id, g.name]));

  const movieGenres = movieData.genre_ids.map(id => genreMap.get(id)).join(' | ');

  let releaseDate;
  if (movieData.media_type === 'tv') {
    releaseDate = movieData.first_air_date;
  }
  if (movieData.media_type === 'movie') {
    releaseDate = movieData.release_date;
  }

  return (
    <div className="w-full h-[80vh] relative font-bold">
      <img
        src={backdropPath}
        alt={movieData.title || movieData.name}
        className="w-full h-full object-cover brightness-100"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 text-white p-2 w-96 space-y-3 flex flex-col items-start">
        <img
          src={logoPath}
          alt={movieData.title || movieData.name}
          className="w-auto max-h-24 object-contain mb-4"
        />
        <div className="flex items-center space-x-4 text-lg">
          <span>{releaseDate.slice(0, 4)}</span>
          <span> | </span>
          <span>{movieData.vote_average.toFixed(1)}</span>
          <span> | </span>
          <span className="capitalize">{movieData.media_type}</span>
        </div>
        <p className="text-base leading-relaxed line-clamp-3 max-w-lg">{movieData.overview}</p>
        <span className="text-md mt-2 text-star">{movieGenres}</span>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors duration-200 mt-4">
          <PlayIcon className="size-6 text-white inline-block" />
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
