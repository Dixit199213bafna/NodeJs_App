import express from 'express';
import path from 'path';
import authController from '../controllers/auth.js';
const router = express.Router();

router.get('/login' ,authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logOut', authController.logOut);
router.get('/signUp', authController.getSignUp);
router.post('/signUp', authController.postSignUp);
export default router;