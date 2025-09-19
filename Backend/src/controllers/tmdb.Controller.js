import {
  getMovieCastCrewService,
  getMovieGenresService,
  getMovieImagesService,
  getTopRatedMoviesService,
  getTrendingMoviesService,
} from "../services/tmdb.service.js";

export const getTrendingMovies = async (req, res, next) => {
  try {
    const movies = await getTrendingMoviesService();
    res
      .status(200)
      .json({ message: "Fetched Trending Movies Scuccessfully", movies });
  } catch (error) {
    next(error);
  }
};

export const getTopRatedMovies = async (req, res, next) => {
  try {
    const movies = await getTopRatedMoviesService();

    res
      .status(200)
      .json({ message: "Fetched Toprated Movies Successfully", movies });
  } catch (error) {
    next(error);
  }
};

export const getMovieLogo = async (req, res, next) => {
  try {
    const { movieId, mediaType } = req.params;
    const images = await getMovieImagesService(movieId, mediaType);
    const logo = images.logos;

    res.status(200).json({ message: "Fetched Logos Successfully", logo });
  } catch (error) {
    next(error);
  }
};

export const getMovieGenres = async (req, res, next) => {
  try {
    const { mediaType } = req.params;
    const genres = await getMovieGenresService(mediaType);

    res.status(200).json({ message: "Fetched Movies Successfully", genres });
  } catch (error) {
    next(error);
  }
};

export const getMovieCastCrew = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const credits = await getMovieCastCrewService(movieId);

    res
      .status(200)
      .json({ message: "Fetched Cast and Crew details Successfully", credits });
  } catch (error) {
    next(error);
  }
};
