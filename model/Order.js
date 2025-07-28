const mongoose = require("mongoose");

// creating order schema
const orderSchema = new mongoose.Schema({
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
  delayMessage : {
    type : String,
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
