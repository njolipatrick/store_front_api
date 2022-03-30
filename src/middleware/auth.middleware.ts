import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const SECRET = String(process.env.TOKEN_SECRET);
const verify = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({
            message: "A token is required for authentication"
        });
    }
    try {

        jwt.verify(token, SECRET);

        next()
    } catch (error) {
        res.status(401).json({ message: 'user unauthozied' })
    }
}

export default verify;