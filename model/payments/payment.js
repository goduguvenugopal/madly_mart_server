const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    mongoOrderId: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "paid",
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      default: "",
    },
    razorpay_order_id: {
      type: String,
      default: "",
    },
    razorpay_signature: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
