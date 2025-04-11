import express from "express";
import { handlePostsignip, handleLogin } from '../controllers/login.js'; 

const router = express.Router();

router.post('/signup', handlePostsignip);
router.post('/login', handleLogin);

export default router;