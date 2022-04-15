import { Router } from "express";
import products from "../../handler/product.handler";

const product = Router();

product.get("/", products.index);
product.get("/:id", products.show);
product.post("/", products.create); // protected
product.delete("/:id", products.destroy); // protected

export default product;
