import Order from "../models/Order.js";
import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

// @desc Create Order
// @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No orders");
  } else {
    const order = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    order.orderItems.map(async (order) => {
      const product = await Product.findById(order.product);
      product.countInStock = product.countInStock - order.quantity;
      await product.save();
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc Create Order
// @GET  /api/orders/:order_id
// @access Private
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.order_id).populate(
    "user",
    "name email"
  );
  if (
    req.user._id.toString() === order.user._id.toString() ||
    req.user.isAdmin
  ) {
    res.status(200).json(order);
  } else {
    throw Error("Order not found");
  }
});

// @desc get Orders
// @GET  /api/orders/
// @access Private/admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name id");
  res.status(200).json(orders);
});

// @desc Send Order
// @GET  /api/orders/:order_id/send
// @access Private/admin
const sendOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.order_id);
  if (order) {
    order.isSent = true;
    order.sentAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Mark order as delivered
// @GET  /api/orders/:order_id/deliver
// @access Private/admin
const delivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.order_id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export { createOrder, getOrder, getOrders, sendOrder, delivered };
