import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const SECRET = String(process.env.TOKEN_SECRET);
import { UserStore } from '../models/user.model';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers.token;

    if (!token) {
        return res.status(403).json({
            message: "A token is required for authentication"
        });
    }
    try {

        jwt.verify(token, SECRET);
        next();

    } catch (error) {
        return res.status(401).json({ message: 'user unauthozied' })
    }
}

export const admin = async (req: Request, res: Response, next: NextFunction) => {
    const user = new UserStore();
    const role = await user.userRole(req.body.email);
    if (role === 'admin' || 'user') {
        next();
    } else {
        return res.status(401).json({ message: 'action cannot be performed on this route' })
    }
}

export const user = async (req: Request, res: Response, next: NextFunction) => {
    const user = new UserStore();
    const role = await user.userRole(req.body.email);
    if (role === 'user') {
        next();
    } else {
        return res.status(401).json({ message: 'action cannot be performed on this route' })
    }
}