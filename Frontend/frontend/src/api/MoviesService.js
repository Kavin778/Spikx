import axios from 'axios';

const BASE_URL = import.meta.env.VITE_NODE_BASE_URL;

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tmdb/trending`);
    return response.data.movies;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tmdb/top-rated`);
    return response.data.movies;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

export const getMovieImages = async (movieId, movieType) => {
  try {
    const response = await axios.get(`${BASE_URL}/tmdb/logo/${movieId}/${movieType}`);
    return response.data.logo;
  } catch (error) {
    console.error('Error fetching movie images:', error);
    return [];
  }
};

export const getMovieGenres = async movieType => {
  try {
    const response = await axios.get(`${BASE_URL}/tmdb/genres/${movieType}`);
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return { genres: [] };
  }
};

export const getMovieDetails = async movieId => {
  try {
    const response = await axios.get(`${BASE_URL}/movies/getMovieByTmdb/${movieId}`);
    console.log(response.data);
    return response.data.movie;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
