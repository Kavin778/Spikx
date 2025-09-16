import axios from "axios";

const BASE_URL = import.meta.env.VITE_NODE_BASE_URL

export const getTrendingMovies = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/trending`);
        return response.data.movies.results;
    }
    catch(error){
        console.error("Error fetching trending movies:", error);
        return [];
    }
}

export const getTopRatedMovies = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/top-rated`);
        return response.data.movies.results;
    }
    catch(error){
        console.error("Error fetching top rated movies:", error);
        return [];
    }
}

export const getMovieImages = async (movieId,movieType)=>{
    try{
        const response = await axios.get(`${BASE_URL}/logo/${movieId}/${movieType}`);
        return response.data.logos.logos;
    }
    catch(error){
        console.error("Error fetching movie images:",error);
        return [];
    }
}

export const getMovieGenres = async (movieType) =>{
    try{
        const response = await axios.get(`${BASE_URL}/genres/${movieType}`);
        return response.data.genres.genres;
    }
    catch(error){
        console.error("Error fetching movie genres:",error);
        return { genres: []};
    }
}
