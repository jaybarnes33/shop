import express from "express";
import * as controller from "../controllers/products.js";

const router = express.Router();

// @desc Fetch all products
// @routue GET /api/products
// @access Public
router.get("/", controller.getProducts);

// @desc Fetch singleproduct
// @routue GET /api/products/:id
// @access Public
router.get("/:id", controller.getProduct);

export default router;
