import express from "express";
import * as controller from "../controllers/products.js";
import { protect, admin } from "../middleware/auth.js";
const router = express.Router();

router
  .route("/")
  .get(controller.getProducts)
  .post(protect, admin, controller.createProduct);

router
  .route("/:product_id")
  .get(controller.getProduct)
  .put(protect, admin, controller.updateProduct)
  .delete(protect, admin, controller.deleteProduct);

router.route("/:product_id/reviews").post(protect, controller.createReview);
export default router;
