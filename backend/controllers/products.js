import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

//  @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
// @Route PUT /api/products
// @Desc Update Product
// Access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.product_id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    product.name = req.body.name;
    product.image = req.body.image;
    product.category = req.body.category;
    product.price = req.body.price;
    product.brand = req.body.image;
    product.countInStock = req.body.countInStock;
    product.numReviews = req.body.numReviews;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  }
});

// @Route get /api/products
// @Desc Get Products
// Access Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

// @Route get /api/products/:product_id
// @Desc Get Product
// Access Public
export const getProduct = asyncHandler(async (req, res) => {
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
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.product_id);
  if (!product) {
    throw Error("Product not found");
  } else {
    await product.remove();
    res.json({ message: "Product Removed" });
  }
});
