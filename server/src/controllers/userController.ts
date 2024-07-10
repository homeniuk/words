import express, { NextFunction } from 'express';
import { createUser, getUserByEmail } from '../db/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BadRequestError, ServerError } from '../middlewares/ErrorHandler';
import { copyWordsToUser } from '../db/userWords';

export const register = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password){
            next (new BadRequestError('You need to fill all fields'));
            return;
        }

        const exUser = await getUserByEmail(email);
        if (exUser){
            next (new BadRequestError('User with whis email already exist'));
            return; 
        }

        const hashPassword  = await bcrypt.hash(password, 3);
        const user          = await createUser({username, email, password: hashPassword});

        const payload       = {id:user._id, username, email};
        const token         = jwt.sign(payload, String(process.env.JWT_SECRET), {expiresIn: '30d'});

        copyWordsToUser(String(user._id));

        return res.json({id:user._id, username, email, token});
    } catch(error) {
        next (new ServerError('Server error'));
    }
} 
export const login = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        if (!email || !password){
            next (new BadRequestError('You must enter email and password'));
            return;
        }
        const exUser = await getUserByEmail(email);
        if (!exUser){
            next (new BadRequestError('User with this email is not registered'));
            return; 
        }
        const isPassEquals = await bcrypt.compare(password, exUser.password);
        if (!isPassEquals){
            next (new BadRequestError('Email or password is wrong'));
            return; 
        }
        const username = exUser.username;
        const payload = {id:exUser._id, username, email};
        const token = jwt.sign(payload, String(process.env.JWT_SECRET), {expiresIn: '30d'});
        return res.json({id:exUser._id, username, email, token});

    } catch(error) {
        next (new ServerError('Server error'));
    }
} 