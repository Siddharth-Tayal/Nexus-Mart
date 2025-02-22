const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// USER ROUTES
// Placing the Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id
    });
    res.status(201).json({
        success: true,
        order
    })
})

// Single Order Detail
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name , email");
    if (!order) return next(new ErrorHandler(`No order exist with oderId : ${req.params.id}`, 404));
    res.status(200).json({
        success: true,
        order
    })
})

// My Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
        success: true,
        orders
    })
})

// get all order details
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})


// ADMIN ROUTES
// Update Order Status
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) return next(new ErrorHandler("No order found", 400));
    if (order.orderStatus === "Delivered") return next(new ErrorHandler("You have delievered this order", 400));

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (ord) => {
            await updateStock(ord.product, ord.quantity);
        })
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        order
    })
})
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false })
}

// Delete Order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new ErrorHandler("You have delievered this order", 400));
    await order.deleteOne();
    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    })
})