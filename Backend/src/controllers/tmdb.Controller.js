import { getMovieGenresService, getMovieLogoService, getTopRatedMoviesService, getTrendingMoviesService } from "../services/tmdb.service.js";

export const getTrendingMovies = async (req,res,next) =>{
    try{
        const movies = await getTrendingMoviesService();
        res.status(200)
                .json({movies})
    }

    catch(error){
        next(error);
    }
}

export const getTopRatedMovies = async (req,res,next) =>{
    try{
        const movies = await getTopRatedMoviesService();

        res.status(200)
                .json({movies});
    }
    catch(error){
        next(error);
    }
}

export const getMovieLogo = async (req,res,next) =>{
    try{
        const {movieId,mediaType} = req.params;
        const logos = await getMovieLogoService(movieId,mediaType);

        res.status(200)
              .json({logos});
    }
    catch(error){
        next(error);
    }
}

export const getMovieGenres = async (req,res,next) =>{
    try{
        const {mediaType} = req.params;
        const genres = await getMovieGenresService(mediaType);

        res.status(200)
                .json({genres});
    }
    catch(error){
        next(error);
    }
}