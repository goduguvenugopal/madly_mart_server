const express = require("express");
const router = express.Router();
const emailController = require("../controller/emailController");

// creating login route endpoints
router.post("/send-otp", emailController.sendMail);
router.post("/verify-otp", emailController.verifyOtp);

module.exports = router;
