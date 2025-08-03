const express = require("express");
const paymentController = require("../../controller/payments/verifyPayments");
const router = express.Router();

router.post("/payment/verify-payment", paymentController.verifyPayment);
router.get("/payment/get-all-payments", paymentController.getPayments);

module.exports = router;
