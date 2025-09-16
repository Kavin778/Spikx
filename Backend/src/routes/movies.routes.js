import Router from "express";
const router = Router();
import {createMovies,getMovie} from "../controllers/movies.Controller.js";

router.post('/createMovie', createMovies);
router.get('/getMovie/:id', getMovie);

export default router;