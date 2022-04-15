import { Router } from "express";
import order from "../controller/order/order.controller";
import product from "../controller/product/product.controller";
import user from "../controller/user/user.controller";
const router = Router();

router.use("/user", user);
router.use("/order/", order);
router.use("/product/", product);

export default router;
