import express from "express";
import * as controller from "../controllers/products.js";
import { protect, admin } from "../middleware/auth.js";
const router = express.Router();

// @desc Fetch all products
// @routue GET /api/products
// @access Public
router.get("/", controller.getProducts);

// @desc Fetch singleproduct
// @routue GET /api/products/:id
// @access Public
router
  .route("/:product_id")
  .get(controller.getProduct)
  .delete(protect, admin, controller.deleteProduct);

export default router;
