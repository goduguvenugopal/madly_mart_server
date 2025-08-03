const express = require("express");
const router = express.Router();
const failedPaymentsController = require("../../controller/payments/failedPayments");

router.post(
  "/payments/failed-payment",
  failedPaymentsController.postFailedPaymentController
);
router.get(
  "/payments/get-failed-payments",
  failedPaymentsController.getFailedPaymentsController
);

module.exports = router;
