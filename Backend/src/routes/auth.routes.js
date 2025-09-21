import { Router } from "express";
const router = Router();
import { login, logout, refresh } from "../controllers/auth.Controller.js";

router.post("/login",login);
router.post("/refresh",refresh);
router.post("/logout",logout);

export default router;
