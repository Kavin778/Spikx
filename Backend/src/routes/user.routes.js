import { Router } from 'express';
const router = Router();
import { registerUser } from '../controllers/user.Controller.js';

router.post('/register', registerUser);

export default router;