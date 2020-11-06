import Order from "../models/Order.js";
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
  if (req.user._id.toString() === order.user._id.toString()) {
    res.status(200).json(order);
  } else {
    throw Error("Order not found");
  }
});

export { createOrder, getOrder };
