import express from 'express';
import { login, register }  from '../controllers/userController';
import { downloadWords, getWord }    from '../controllers/wordController';

const router = express.Router();

router.post('/registration',    register);
router.post('/login',           login);
router.post('/downloadWords',   downloadWords);
router.post('/getword',         getWord);


export default router;