const mongoose = require("mongoose");

const categorySlideSchema = new mongoose.Schema({
  categorySlides: {
    type: Array,
    default: [],
  },
});

const CategorySlide = mongoose.model("CategorySlide", categorySlideSchema);

module.exports = CategorySlide;
