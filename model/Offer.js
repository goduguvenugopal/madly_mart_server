const mongoose = require("mongoose");

// creating offers schema
const offersSchema = new mongoose.Schema({
  sevenDays: {
    type: Number,
  },
  tenDays: {
    type: Number,
  },
  twentyDays: {
    type: Number,
  },
  thirtyDays: {
    type: Number,
  },
  deliveryCharges: {
    type: Number,
  },
});

const Offer = mongoose.model("Offer", offersSchema);
module.exports = Offer;
