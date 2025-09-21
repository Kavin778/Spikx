import Router from "express";
import {createMovies,getMovie,getMovieByTmdb} from "../controllers/movies.Controller.js";
import { authHandler } from "../middleware/authHandler.js";

const router = Router();

router.use(authHandler);

router.post('/createMovie',createMovies);
router.get('/getMovie/:id',getMovie);
router.get('/getMovieByTmdb/:id',getMovieByTmdb);

export default router;