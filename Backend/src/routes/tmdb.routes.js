import Router from "express";
const router = Router();
import { getMovieGenres,getMovieLogo,getTrendingMovies,getTopRatedMovies,getMovieCastCrew } from "../controllers/tmdb.Controller.js";

router.get('/trending',getTrendingMovies);
router.get('/top-rated',getTopRatedMovies);
router.get('/logo/:movieId/:mediaType',getMovieLogo);
router.get('/genres/:mediaType',getMovieGenres);
router.get('/cast-crew/:movieId',getMovieCastCrew);
export default router;