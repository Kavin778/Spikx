import React from 'react';
import MovieList from '../components/MovieList';
import { useState, useEffect } from 'react';
import { getTrendingMovies, getTopRatedMovies } from '../api/MoviesService';
import HeroList from '../components/HeroList';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const trending = await getTrendingMovies();
      const topRated = await getTopRatedMovies();
      setTrendingMovies(trending);
      setTopRatedMovies(topRated);
    };
    fetchMovies();
  }, []);
  if (trendingMovies.length === 0 || topRatedMovies.length === 0) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <h1 className="text-2xl text-white font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black ">
      <div className="ml-10">
        <HeroList movieData={trendingMovies} />
      </div>
      <div className="min-h-screen bg-black ">
        <MovieList title="Popular Movies" movies={trendingMovies} />
        <MovieList title="Top Rated Movies" movies={topRatedMovies} />
      </div>
    </div>
  );
};

export default HomePage;
