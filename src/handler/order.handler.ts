/* eslint-disable indent */
import { Order, OrderLog } from "../models/order.model";
import { Request, Response, Application } from "express";
import { admin, authenticate, user } from "../middleware/auth.middleware";
import { UserStore } from "../models/user.model";
const store = new OrderLog();

const index = async (req: Request, res: Response) => {
    try {

        const result = await store.index();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};
const show = async (req: Request, res: Response) => {
    try {
        const ID = Number(req.params.id);
        const result = await store.show(ID);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};
const create = async (req: Request, res: Response) => {
    try {
        const token = req.body.token || req.query.token || req.headers.token;

        const user_id = new UserStore().userinfo(token).id;

        const order: Order = {
            status: req.body.status,
            quantity: req.body.quantity,
            user_id: Number(user_id),
        };
        const { product_id } = req.params;

        const result = await store.create({ order, product_id: Number(product_id) });
        const response = {
            status: "success",
            statusCode: 200,
            response: result,
        };
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: error });
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const result = await store.destroy(Number(req.params.id));
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const orderRoutes = (app: Application) => {
    app.get("/api/v1/order/", authenticate, admin, index);
    app.get("/api/v1/order/:id", authenticate, user, show);
    app.post("/api/v1/order/:product_id", authenticate, admin, create);
    app.delete("/api/v1/order/:id", authenticate, user, destroy);
};

export default orderRoutes;
