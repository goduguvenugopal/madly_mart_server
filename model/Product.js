const mongoose = require("mongoose");

// creating product Schema

const productSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
  },
  descriptionPoints: {
    type: Array,
    default: [],
  },

  itemCost: {
    type: String,
    required: true,
  },

  itemImage: {
    type: [
      {
        image: { type: String, default: "" },
        public_id: { type: String, default: "" },
      },
    ],
    required: true,
    default: [],
  },
  itemQty: {
    type: String,
  },
  minOrderQty: {
    type: String,
  },

  itemStock: {
    type: String,
    required: true,
  },
  itemCategory: {
    type: String,
    required: true,
  },
  itemSubCategory: {
    type: String,
    required: true,
  },
  offerCost: {
    type: String,
  },
  offerMessage: {
    type: String,
  },
  productTags: {
    type: Array,
    required: true,
    default: [],
  },
  variants: {
    type: [
      {
        color: String,
        capacity: String,
        size: String,
        weight: String,
        originalCost: Number,
        sellingCost: Number,
        stock: Number,
      },
    ],
    default: [],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
