const mongoose = require("mongoose");

const shippingAddressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  village: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
});

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);

module.exports = ShippingAddress;
