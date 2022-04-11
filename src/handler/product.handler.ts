/* eslint-disable indent */
import { Product, ProductStore } from "../models/product.model";
import { Request, Response, Application } from "express";
import { authenticate, admin } from "../middleware/auth.middleware";

const store = new ProductStore();

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
const indexByID = async (req: Request, res: Response) => {
  try {
    const ID = Number(req.params.id);
    const result = await store.indexByID(ID);
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
const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const result = await store.create(product);
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

const update = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const result = await store.update(product, Number(req.params.id));
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

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await store.destroy(Number(req.params.id));
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

const productRoutes = (app: Application) => {
  app.get("/api/v1/product/", index);
  app.get("/api/v1/product/:id", indexByID);
  app.post("/api/v1/product/", authenticate, admin, create); // protected
  app.put("/api/v1/product/:id", authenticate, admin, update); // protected
  app.delete("/api/v1/product/:id", authenticate, admin, destroy); // protected
};

export default productRoutes;
