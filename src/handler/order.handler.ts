/* eslint-disable indent */
import { Order, OrderLog } from '../models/order.model';
import { Request, Response, Application } from 'express';

const store = new OrderLog();

const index = async (req: Request, res: Response) => {
    try {
        const result = await store.index();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error })
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
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error })
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
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error })
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const result = await store.destroy(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error })
    }
};

const orderRoutes = (app: Application) => {
    app.get('/api/v1/order/', index);
    app.post("/api/v1/order/", create);
    app.put("/api/v1/order/:id", update);
    app.delete("/api/v1/order/:id", destroy);
};

export default orderRoutes;
