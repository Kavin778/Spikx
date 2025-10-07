import axios from "axios";
import {
  createMoviesService,
  getAllMoviesService,
  getMovieByIdService,
  getMovieByTmdbIdService,
} from "../services/movies.service.js";
import { LocalIpAddress } from "../config/ipconfig.js";
import {
  getMovieImagesService,
  getMovieCastCrewService,
  getMovieTmdbService,
} from "../services/tmdb.service.js";
import { getSignedUrlService } from "../services/auth.service.js";

export const createMovies = async (req, res, next) => {
  try {
    const movieData = req.body;
    const newMovie = await createMoviesService(movieData);

    res
      .status(201)
      .json({ message: "Movie created successfully", data: newMovie });
  } catch (error) {
    next(error);
  }
};

export const getMovieByTmdb = async (req, res, next) => {
  try {
    const tmdbId = req.params.id;
    const moviedb = await getMovieByTmdbIdService(tmdbId);
    const mediaType = moviedb?.type || "movie";

    const images  = await  getMovieImagesService(tmdbId, mediaType)
    const details = await  getMovieTmdbService(tmdbId)
    const castCrew = await  getMovieCastCrewService(tmdbId, mediaType)

    const movie = {
      movieId: moviedb?.id || null,
      details, 
      backdrops: images.backdrops,
      posters: images.posters,
      logos: images.logos,
      cast: castCrew.cast,
      crew: castCrew.crew,
      mediaType: moviedb?.type || "movie",
    };

    res.status(200).json({ message: "Movie fetched successfully", movie });
  } catch (error) {
    next(error);
  }
};

export const getMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await getMovieByIdService(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const range = req.headers.range;
    const ip = LocalIpAddress();
    const jellyPort = process.env.JELLYFIN_PORT || 8096;
    const apikey = process.env.JELLYFIN_API_KEY;
    const jellyUrl = `http://${ip}:${jellyPort}/Videos/${movie.jellyfinItemId}/stream.mp4?api_key=${apikey}&static=true`;
    const axiosConfig = {
      method: "get",
      url: jellyUrl,
      responseType: "stream",
      headers: {},
    };
    if (range) {
      axiosConfig.headers.Range = range;
    }
    const response = await axios(axiosConfig);
    res.writeHead(response.status, response.headers);
    response.data.pipe(res);
  } catch (error) {
    next(error);
  }
};


export const getSignedUrl = async (req,res,next)=>{
  try{
    const movieId = req.params.id;
    const userId = req.userId;
    const ip = LocalIpAddress()

    const response = await getSignedUrlService(movieId,userId);

    if(!response.success){
      return res.status(400).json({message:response.message})
    }
    const urlToken = response.token;

    const signedUrl = `http://${ip}:3000/api/movies/getMovie/${movieId}?token=${urlToken}`

    res.status(200).json({signedUrl:signedUrl});
  }
  catch(error){
    next(error)
  }
}

export const getAllMovies = async (req,res,next)=>{
  try{
    const movies = await getAllMoviesService();
    res.status(200).json({message:"Movies fetched successfully",movies:movies});
  }
  catch(error){
    next();
  }
}

