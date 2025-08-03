const mongoose = require("mongoose");

const failedPaymentSchema = new mongoose.Schema(
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
    },
    paymentStatus: {
      type: String,
      default: "failed",
    },
    razorpay_payment_id: {
      type: String,
      default: "",
    },
    razorpay_order_id: {
      type: String,
      default: "",
    },

    error: {
      code: String,
      description: String,
      source: String,
      step: String,
      reason: String,
      metadata: Object,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const FailedPayment = mongoose.model("FailedPayment", failedPaymentSchema);

module.exports = FailedPayment;
