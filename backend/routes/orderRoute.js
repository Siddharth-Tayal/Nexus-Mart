const express = require("express");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const router = express.Router();


router.route("/neworder").post(isAuthenticated, newOrder);
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
router.route("/orders/me").get(isAuthenticated, myOrders);
router.route("/admin/orders/all").get(isAuthenticated, authorizeRole(), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticated, authorizeRole(), updateOrderStatus).delete(isAuthenticated, authorizeRole(), deleteOrder);
module.exports = router;