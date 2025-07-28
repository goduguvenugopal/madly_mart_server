const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const verifyToken = require("../utils/middleware");
 

router.post("/add-to-cart", verifyToken, cartController.addToCart);
router.get(
  "/get-user-cart-products",
  verifyToken,
  cartController.getUserCartProducts
);
router.put("/update-cart/:id", cartController.updateCartProduct);
router.delete(
  "/delete-user-cart-product/:id",
  cartController.deleteCartProduct
);

module.exports = router;
