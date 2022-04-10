/* eslint-disable indent */
import { Order, OrderLog } from '../models/order.model';
import { Request, Response, Application } from 'express';
import { authenticate, user } from '../middleware/auth.middleware';
const store = new OrderLog();

const index = async (req: Request, res: Response) => {
    try {
        const result = await store.index();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
};
const indexByID = async (req: Request, res: Response) => {
    try {
        const ID = Number(req.params.id);
        const result = await store.indexByID(ID);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
};
const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const result = await store.create(order);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const result = await store.update(order, Number(req.params.id));
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const result = await store.destroy(Number(req.params.id));
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
};

const orderRoutes = (app: Application) => {
    app.get('/api/v1/order/', authenticate, user, index);
    app.get('/api/v1/order/:id', authenticate, user, indexByID);
    app.post("/api/v1/order/", authenticate, user, create);
    app.put("/api/v1/order/:id", authenticate, user, update);
    app.delete("/api/v1/order/:id", authenticate, user, destroy);
};

export default orderRoutes;
