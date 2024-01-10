import express from 'express';
import { callback, sendEmail } from '../controller/clientController.js';


const router = express.Router();

router.post('/contact', sendEmail);

router.post('/callback', callback)

export default router;