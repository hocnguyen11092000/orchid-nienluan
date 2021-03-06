const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHanler");
const catchAsyncError = require("./catchAsyncError");

// create a new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paiAt: Date.now(),
    user: req.user._id || "basic user",
  });
  res.status(201).json({
    success: true,
    order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get my order
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders-admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;

  orders.forEach((item) => {
    totalAmount += item.totalPrice;
  });

  const processing = await Order.find({ orderStatus: "Processing" });
  const delivered = await Order.find({ orderStatus: "Delivered" });
  const refused = await Order.find({ orderStatus: "Refused" });
  const processingCount = processing.length;
  const deliveredCount = delivered.length;
  const refusedCount = refused.length;

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
    processingCount,
    deliveredCount,
    refusedCount,
  });
});

//update order status
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHander("Order not found with this id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (order.orderStatus === "Refused") {
    order.orderStatus = req.body.status;

    await order.save({
      validateBeforeSave: false,
    });

    return res.status(200).json({
      success: true,
    });
  }

  if (req.body.status === "Delivered") {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity * item.weight);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliverdAt = Date.now();
  }

  await order.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, weight) {
  const product = await Product.findById(id);
  if (product) {
    product.stock -= weight;
    await product.save({ validateBeforeSave: false });
  }
}

//delete order-admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this id", 404));
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});
