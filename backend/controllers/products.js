import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw Error("Product not found");
  } else {
    res.status(200).json(product);
  }
});

export { getProducts, getProduct };
