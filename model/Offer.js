const mongoose = require("mongoose");

// creating offers schema
const offersSchema = new mongoose.Schema({
   adsPopUp: {
    type: String,
  },
  couponCode: {
    type: String,
  },
  discount: {
    type: Number,
  },
  deliveryCharges: {
    type: Number,
  },
});

const Offer = mongoose.model("Offer", offersSchema);
module.exports = Offer;
