import axios from "axios";

const TmdbApiKey = process.env.TMDB_API_KEY;
const TmdbBaseUrl = process.env.TMDB_BASE_URL;
const TmdbImageBaseUrl = process.env.TMDB_IMAGE_BASE_URL;
const TmdbOriginalImageBaseUrl = process.env.TMDB_ORIGINAL_IMAGE_BASE_URL;

export async function getTrendingMoviesService() {
    const url = `${TmdbBaseUrl}/trending/movie/day`;
    const response = await axios.get(url, {
        params: {
            api_key: TmdbApiKey,
            language: 'en-US',
        }
    })
    return response.data;
}

export async function getTopRatedMoviesService(){
    const url = `${TmdbBaseUrl}/movie/top_rated`;
    const response = await axios.get(url,{
        params:{
            api_key: TmdbApiKey,
            language: 'en-US',
            page: 1,
        }
    });
    return response.data;
}

export async function getMovieLogoService(movieId,mediaType){
    const url = `${TmdbBaseUrl}/${mediaType}/${movieId}/images`;
    const response = await axios.get(url,{
        params:{
            api_key: TmdbApiKey,
        }
    })
    return response.data;
}

export async function getMovieGenresService(mediaType){
    const url = `${TmdbBaseUrl}/genre/${mediaType}/list`;
    const response = await axios.get(url,{
        params:{
            api_key: TmdbApiKey,
            language: 'en-US',
        }
    });
    return response.data;
}
