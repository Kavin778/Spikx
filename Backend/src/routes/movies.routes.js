import Router from "express";
import {createMovies,getMovie,getMovieByTmdb, getSignedUrl} from "../controllers/movies.Controller.js";
import { authHandler } from "../middleware/authHandler.js";
import { signedUrlHandler } from "../middleware/signedUrlHandler.js";

const router = Router();

router.get("/getMovie/:id",signedUrlHandler,getMovie);

router.use(authHandler);

router.get('/getSignedUrl/:id',getSignedUrl)
router.post('/createMovie',createMovies);
router.get('/getMovieByTmdb/:id',getMovieByTmdb);

export default router;