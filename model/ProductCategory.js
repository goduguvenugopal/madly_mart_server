const mongoose = require("mongoose");

// creating carousel for product category schema
const productCategorySchema = new mongoose.Schema({
  productCategoryName: {
    type: String,
    required: true,
  },
  productImage: {
    type: {
      image: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    required: true,
  },
  available: {
    type: String,
    required: true,
  },
});

const productCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

module.exports = productCategory;
