import Router from "express";
import { getMovieGenres,getMovieLogo,getTrendingMovies,getTopRatedMovies,getMovieCastCrew } from "../controllers/tmdb.Controller.js";
import { authHandler } from "../middleware/authHandler.js";

const router = Router();

router.use(authHandler)

router.get('/trending',getTrendingMovies);
router.get('/top-rated',getTopRatedMovies);
router.get('/logo/:movieId/:mediaType',getMovieLogo);
router.get('/genres/:mediaType',getMovieGenres);
router.get('/cast-crew/:movieId',getMovieCastCrew);
export default router;