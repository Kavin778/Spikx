import { Router } from "express";
import { createRoom,getRooms, joinRoom } from "../controllers/room.Controller.js";
import { authHandler } from "../middleware/authHandler.js";
const router = Router();

router.use(authHandler)

router.post("/createRoom",createRoom);
router.get("/getRooms",getRooms)
router.post("/joinRoom",joinRoom)

export default router;