import express from 'express';
import { callback, getMessage, sendMessage } from '../controller/Messages/messageController.js';


const router = express.Router();

router.post('/sentmessage', sendMessage);

router.post('/callback', callback);

router.get('/getmessage',getMessage);

export default router;