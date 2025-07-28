const mongoose = require("mongoose");

// creating cart product schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
    default: [],
  },
  productId: {
    type: String,
    required: true,
  },
  orderType: {
    type: String,
    required: true,
  },
  itemQty: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
