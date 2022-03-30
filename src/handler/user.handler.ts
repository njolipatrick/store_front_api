/* eslint-disable indent */
import { User, UserStore } from '../models/user.model';
import { Request, Response, Application } from 'express';
import verify from '../middleware/auth.middleware'

const store = new UserStore();

const index = async (req: Request, res: Response) => {
    try {
        const result = await store.index();
        const response = {
            status: 'success', statusCode: 200, response: result
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error })
    }
};

const register = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            email: req.body.email,
            lastName: req.body.lastName,
            password: req.body.password
        };
        console.log(user);

        const isRegistered = await store.checker(user.email);
        if (isRegistered) {
            res.status(409).json({ message: 'user already exist' })
            return
        } else {
            const result = await store.register({ user });
            const response = {
                status: 'success', statusCode: 200, response: result
            }
            res.status(200).json(response);
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error })
    }
};
const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await store.authenticate({ email, password });
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error })
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            email: req.body.email,
            lastName: req.body.lastName,
            password: req.body.password
        };
        const result = await store.update({ user, id: Number(req.params.id) });
        const response = {
            status: 'success', statusCode: 200, response: result
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error })
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const result = await store.destroy({ id: Number(req.params.id) });
        if (result.length === 0) {
            res.status(404).json({ message: 'user not found' })
        } else {
            console.log(result)
            const response = {
                status: 'success', statusCode: 200, response: result
            }
            res.status(200).json(response);
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }
};

const userRoutes = (app: Application) => {
    app.post('/api/v1/user/login', login);
    app.post("/api/v1/user/register", register);
    app.get('/api/v1/user/', verify, index); // protected
    app.put("/api/v1/user/:id", verify, update); // protected
    app.delete("/api/v1/user/:id", verify, destroy); // protected
};

export default userRoutes;
