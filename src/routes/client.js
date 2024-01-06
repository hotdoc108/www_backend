import express from 'express';
import { sendEmail } from '../controller/clientController.js';


const router = express.Router();

router.post('/contact', sendEmail);

export default router;