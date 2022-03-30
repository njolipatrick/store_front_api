/* eslint-disable indent */
import { Product, ProductStore } from '../models/product.model';
import { Request, Response, Application } from 'express';

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
    try {
        const result = await store.index();
        const response = {
            status: 'success', statusCode: 200, response: result
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const result = await store.create(product);
        const response = {
            status: 'success', statusCode: 200, response: result
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const result = await store.update(product, Number(req.params.id));
        const response = {
            status: 'success', statusCode: 200, response: result
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const result = await store.destroy(Number(req.params.id));
        const response = {
            status: 'success', statusCode: 200, response: result
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
};

const productRoutes = (app: Application) => {
    app.get('/api/v1/product/', index);
    app.post("/api/v1/product/", create);
    app.put("/api/v1/product/:id", update);
    app.delete("/api/v1/product/:id", destroy);
};

export default productRoutes;
