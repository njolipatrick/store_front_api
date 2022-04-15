import { Router } from "express";
import { adminRole, userRole, authenticate } from "../../middleware/auth.middleware";
import orderRoutes from "../../handler/order.handler";
const order = Router();

order.get("/", orderRoutes.index);// protected

order.get("/user/active", orderRoutes.ActiveOrderbyUser);// protected

order.get("/user/complete", orderRoutes.CompletedOrderbyUser);// protected

order.get("/:id", orderRoutes.show);// protected

order.post("/:product_id", orderRoutes.create);// protected

order.delete("/:id", orderRoutes.destroy);// protected

export default order;
