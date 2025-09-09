import { Router } from "express";
const router = Router();
import { createRoom } from "../controllers/room.Controller.js";

router.post("/createRoom", createRoom);

export default router;