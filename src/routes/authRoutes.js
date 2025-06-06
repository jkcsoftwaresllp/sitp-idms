import express from 'express';
import * as authController from '../modules/auth/controllers/authController.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;