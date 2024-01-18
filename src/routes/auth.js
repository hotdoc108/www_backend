import express from 'express';
import { forgetPassword, login, logout, resetPassword, signUp } from '../controller/Authentication/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.post('/logout', logout);
router.post('/resetpassword', resetPassword);
router.post('/forgetPassword', forgetPassword);

export default router;