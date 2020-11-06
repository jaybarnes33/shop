import express from "express";
import * as controller from "../controllers/orders.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(protect, controller.createOrder);

router.route("/:order_id").get(protect, controller.getOrder);

export default router;
