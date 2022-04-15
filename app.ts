/* eslint-disable indent */
import express, { Request, Response, Application, NextFunction } from "express";
import cors from "cors";

import productRoutes from "./src/handler/product.handler";
import userRoutes from "./src/handler/user.handler";
import orderRoutes from "./src/handler/order.handler";
import router from "./src/routes";

const app: Application = express();

app.use(express.json());

app.use('/api/v1',  router);

// productRoutes(app);
// userRoutes(app);

app.use(
  "/api/v1", cors(), (req: Request, res: Response, next: NextFunction) => {
    res.send("hello world");
  }
);

export default app;
