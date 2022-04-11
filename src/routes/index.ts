import { Router } from "express";
import product from "./product/product.route";
const router = Router();

router.use("/product", product);

export default router;
