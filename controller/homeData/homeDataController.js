const Carousel = require("../../model/Carousel");
const CategorySlide = require("../../model/category/categorySlides");
const productCategory = require("../../model/category/ProductCategory");
const Offer = require("../../model/Offer");
const Product = require("../../model/Product");
const express = require("express");
const router = express.Router();


// all home data route 
router.get("/home-data", async (req, res) => {
  try {
    const [products, carousel, categories, categorySlides, offers] = await Promise.all([
      Product.find(),  
      Carousel.findOne(),                      
      productCategory.find(),                 
      CategorySlide.findOne(),                       
      Offer.findOne()                  
    ]);

    res.json({
      products,
      carousel,
      categories,
      categorySlides,
      offers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


module.exports = router