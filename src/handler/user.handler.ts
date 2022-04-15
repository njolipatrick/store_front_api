/* eslint-disable indent */
import { User, UserStore } from "../models/user.model";
import { Request, Response } from "express";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
    try {
        const result = await store.index();
        const response = {
            status: "success",
            statusCode: 200,
            response: result,
        };
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};
const show = async (req: Request, res: Response) => {
    try {
        const ID = Number(req.params.id);
        const result = await store.show(ID);
        if (result.length === 0) return res.status(404).json({ message: "user not found" });
        const response = {
            status: "success",
            statusCode: 200,
            response: result,
        };
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const register = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            email: req.body.email,
            lastName: req.body.lastName,
            role: req.body.role,
            password: req.body.password,
        };

        const userAlreadyExist = await store.checker(user.email);
        if (userAlreadyExist) {
            return res
                .status(409)
                .json({
                    message: `user ${user.firstName} with email ${user.email} already exist`,
                });
        } else {
            const result = await store.register({ user });
            const response = {
                status: "success",
                statusCode: 200,
                response: result,
            };
            return res.status(200).json(response);
        }
    } catch (error) {

        return res.status(500).json({ message: error });
    }
};
const login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const foundUser = await store.checker(email);
        if (foundUser) {
            const result = await store.authenticate({ email, password });
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: `user with ${email} not found` });
        }
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const result = await store.destroy({ id: Number(req.params.id) });
        if (result.length === 0) {
            return res.status(404).json({ message: "user not found" });
        } else {
            const response = {
                status: "success",
                statusCode: 200,
                response: result,
            };
            return res.status(200).json(response);
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};


export default { index, show, register, login, destroy };
