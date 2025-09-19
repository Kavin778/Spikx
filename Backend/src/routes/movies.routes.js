import Router from "express";
const router = Router();
import {createMovies,getMovie,getMovieByTmdb} from "../controllers/movies.Controller.js";

router.post('/createMovie', createMovies);
router.get('/getMovie/:id', getMovie);
router.get('/getMovieByTmdb/:id', getMovieByTmdb);

export default router;