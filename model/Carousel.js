const mongoose = require("mongoose");

// creating carousel for images schema
const carouselSchema = new mongoose.Schema({
  offerTitle: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  carouselImage: [
    {
      image: { type: String, default: "" },
      public_id: { type: String, default: "" },
      redirectUrl: { type: String, default: "" },
    },
  ],
});

const Carousel = mongoose.model("Carousel", carouselSchema);

module.exports = Carousel;
