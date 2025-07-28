const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const verifyToken = require("../utils/middleware");
 

router.post("/place-order", verifyToken, orderController.saveOrder);
router.get("/get-all-orders", orderController.getAllOrders);
router.put("/update-order-status/:id", orderController.orderUpdateController);
router.put("/update-order-details/:id", orderController.updateAllController);

module.exports = router;
