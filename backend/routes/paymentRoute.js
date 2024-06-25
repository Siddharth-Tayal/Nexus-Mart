const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentControllers");
router.route("/payment/process").post(isAuthenticated, processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);
module.exports = router;