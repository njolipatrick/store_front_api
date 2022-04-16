import { Router } from "express";
import { adminRole, userRole, authenticate } from "../../middleware/auth.middleware";
import orderRoutes from "../../handler/order.handler";
const order = Router();

order.get("/", authenticate, userRole, orderRoutes.index);// protected

order.get("/user/active", authenticate, adminRole, orderRoutes.ActiveOrderbyUser);// protected

order.get("/user/complete", authenticate, adminRole, orderRoutes.CompletedOrderbyUser);// protected

order.get("/:id", authenticate, adminRole, orderRoutes.show);// protected

order.post("/:product_id", authenticate, adminRole, orderRoutes.create);// protected

order.delete("/:id", authenticate, adminRole, orderRoutes.destroy);// protected

export default order;
