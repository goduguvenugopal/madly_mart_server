const mongoose = require("mongoose");

// creating order schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderedProdcuts: {
      type: Array,
      required: true,
      default: [],
    },
    shippingAddress: {
      type: Array,
      required: true,
      default: [],
    },
    orderStatus: {
      type: String,
      required: true,
    },
    orderDate: {
      type: String,
      required: true,
    },
    orderStatusDate: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: String,
      required: true,
    },
    deliveryCharges: {
      type: Number,
    },
    delayMessage: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "created",
      required: true,
    },
    razorpay_signature: {
      type: String,
      default: "",
    },
    razorpay_payment_id: {
      type: String,
      default: "",
    },
    razorpay_order_id: {
      type: String,
      default: "",
    },
    razorpay_key_id: {
      type: String,
      default: "",
    },
    order_tracking_id: {
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

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
