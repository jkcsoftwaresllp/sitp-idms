import express from 'express';
import { signup, login, simple } from '../controller/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/simple', simple);

export default router;
