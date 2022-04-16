import { Router } from "express";
import products from "../../handler/product.handler";
import { adminRole, userRole, authenticate } from "../../middleware/auth.middleware";

const product = Router();

product.get("/", products.index);
product.get("/:id", products.show);
product.post("/", authenticate, adminRole, products.create); // protected
product.delete("/:id", authenticate, adminRole, products.destroy); // protected

export default product;
