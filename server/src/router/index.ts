import express from 'express';
import { register } from '../controllers/userController';

const router = express.Router();

router.post('/registration', register);

export default router;