import { Router } from "express";
import { createRoom } from "../controllers/room.Controller.js";
import { authHandler } from "../middleware/authHandler.js";
const router = Router();

router.use(authHandler)

router.post("/createRoom",createRoom);

export default router;