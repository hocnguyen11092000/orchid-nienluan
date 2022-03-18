const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const router = express.Router();
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticateUser, newOrder);
router.route("/order/:id").get(isAuthenticateUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticateUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticateUser, authorizeRoles("admin", "staff"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticateUser, authorizeRoles("admin", "staff"), updateOrder)
  .delete(isAuthenticateUser, authorizeRoles("admin", "staff"), deleteOrder);

module.exports = router;
