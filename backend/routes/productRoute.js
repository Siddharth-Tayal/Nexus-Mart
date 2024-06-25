const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReviews, getAdminProducts } = require("../controllers/productController");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticated, authorizeRole(), getAdminProducts);
router.route("/admin/product/new").post(isAuthenticated, authorizeRole(), createProduct);
router.route("/admin/product/:id").put(isAuthenticated, authorizeRole(), updateProduct).delete(isAuthenticated, authorizeRole(), deleteProduct).get(getProductDetails);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticated, createProductReview);
router.route("/review").get(getProductReviews).delete(isAuthenticated, deleteReviews);
module.exports = router;