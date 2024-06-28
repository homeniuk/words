import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password)
            return res.status(400).json({message: 'Need to fill all fields'});

        const exUser = await getUserByEmail(email);
        if (exUser)
            return res.status(400).json({message: 'User is exist'});

        const hashPassword = await bcrypt.hash(password, 3);
        const payload = {username, email};
        const token = jwt.sign(payload, String(process.env.JWT_SECRET), {expiresIn: '5d'});

        const user = await createUser({username, email, password: hashPassword});
        res.cookie('token', token, {maxAge: 5 * 24 * 60 * 60 * 1000, httpOnly: true});

        return res.status(200).json(payload);
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: 'Server error'});
    }
} 