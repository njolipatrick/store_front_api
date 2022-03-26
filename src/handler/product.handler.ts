/* eslint-disable indent */
import { ProductStore } from '../models/product.model';
import { Request, Response, Application } from 'express';

const product = new ProductStore();

const index = async (req: Request, res: Response) => {
    const result = await product.index();
    res.status(200).json(result);
};

const productRoutes = (app: Application) => {
    app.get('/api/v1/product', index);
    // app.post("/book", create);
    // app.put("/book", update);
    // app.delete("/book", destroy);
};
export default productRoutes;
