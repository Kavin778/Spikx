import { Router } from 'express';
const router = Router();
import { getUserDetails, registerUser } from '../controllers/user.Controller.js';
import { authHandler } from '../middleware/authHandler.js';

router.post('/register', registerUser);
router.get('/getUserDetails',authHandler,getUserDetails);

export default router;