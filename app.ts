/* eslint-disable indent */
import express, { Request, Response, Application, NextFunction } from 'express';
import cors from 'cors';

import productRoutes from './src/handler/product.handler';
import userRoutes from './src/handler/user.handler';

const app: Application = express();

app.use(express.json());

productRoutes(app);
userRoutes(app);
app.use('/api/v1', cors(), (req: Request, res: Response, next: NextFunction) => {
    res.send('hello world');
});

export default app;
