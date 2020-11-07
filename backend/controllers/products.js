import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
// @Route get /api/products
// @Desc Get Products
// Access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

// @Route get /api/products/:product_id
// @Desc Get Product
// Access Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.product_id);
  if (!product) {
    throw Error("Product not found");
  } else {
    res.status(200).json(product);
  }
});

// @Route delete /api/products/:product_id
// @Desc Delete a Product
// Access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.product_id);
  if (!product) {
    throw Error("Product not found");
  } else {
    await product.remove();
    res.json({ message: "Product Removed" });
  }
});

export { getProducts, getProduct, deleteProduct };
