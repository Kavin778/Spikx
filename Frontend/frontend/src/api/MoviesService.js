import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getTrendingMovies = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/trending/movie/day?language=en-US&page=1&api_key=${API_KEY}`);
        return response.data.results;
    }
    catch(error){
        console.error("Error fetching trending movies:", error);
        return [];
    }
}

export const getTopRatedMovies = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/movie/top_rated?language=en-US&api_key=${API_KEY}`);
        return response.data.results;
    }
    catch(error){
        console.error("Error fetching top rated movies:", error);
        return [];
    }
}

export const getMovieImages = async (movieId,movieType)=>{
    try{
        const response = await axios.get(`${BASE_URL}/${movieType}/${movieId}/images?api_key=${API_KEY}`);
        return response.data.logos;
    }
    catch(error){
        console.error("Error fetching movie images:",error);
        return [];
    }
}

export const getMovieGenres = async (movieType) =>{
    try{
        const response = await axios.get(`${BASE_URL}/genre/${movieType}/list?language=en-US&api_key=${API_KEY}`);
        return response.data.genres;
    }
    catch(error){
        console.error("Error fetching movie genres:",error);
        return { genres: []};
    }
}
