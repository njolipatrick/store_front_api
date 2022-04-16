import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const SECRET = String(process.env.TOKEN_SECRET);
import { UserStore } from "../models/user.model";
const check = new UserStore();

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers.token;

    if (!token) {
        return res.status(403).json({
            message: "A token is required for authentication",
        });
    }

    try {
        verify(String(token), String(process.env.TOKEN_SECRET));

        next();
    } catch (error) {
        return res.status(401).json({ message: "user unauthozied" });
    }
};

export const adminRole = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers.token;
    const role = await check.getRole(String(token));

    if (role === "admin" || "user") {
        next();
    } else {
        return res
            .status(401)
            .json({ message: "action cannot be performed on this route" + role });
    }
};

export const userRole = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers.token;
    const role = await check.getRole(String(token));

    if (role === "user") {
        next();
    } else {
        return res
            .status(401)
            .json({ message: "action cannot be performed on this route" + role });
    }
};
