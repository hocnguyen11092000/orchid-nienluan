const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllProductReviews,
  deleteReviews,
  getCategory,
} = require("../controller/productController");

const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/category").get(getCategory);
router.route("/product/:id").get(getProductDetails);
router
  .route("/admin/product/new")
  .post(isAuthenticateUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticateUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteProduct);
router.route("/review").put(isAuthenticateUser, createProductReview);
router
  .route("/reviews")
  .get(getAllProductReviews)
  .delete(isAuthenticateUser, deleteReviews);

module.exports = router;