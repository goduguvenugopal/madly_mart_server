const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware");
const categorySlidesController = require("../../controller/category/categorySlidesController");

router.post(
  "/add-category-slides",
  verifyToken,
  categorySlidesController.addCategorySlides
);
router.get("/get-category-slides", categorySlidesController.getCategorySlides);
router.put(
  "/update-category-slides/:id",
  verifyToken,
  categorySlidesController.updateCategorySlides
);

module.exports = router;
