import express from "express";
import * as controller from "../controllers/orders.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .post(protect, controller.createOrder)
  .get(protect, admin, controller.getOrders);

router.route("/:order_id").get(protect, controller.getOrder);

router.route("/:order_id/send").get(protect, admin, controller.sendOrder);
router.route("/:order_id/deliver").get(protect, admin, controller.delivered);
export default router;
