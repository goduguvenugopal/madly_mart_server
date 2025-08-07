// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewController = require("../../controller/reviews/reviewController");
const upload = require("../../utils/multer");
const verifyToken = require("../../utils/middleware");

router.post(
  "/add/reviews",
  verifyToken,
  upload.single("productReviewImg"),
  reviewController.createReview
);
router.get("/get/reviews/:productId", reviewController.getReviewsByProduct);
router.delete(
  "/delete/reviews/:id",
  verifyToken,
  reviewController.deleteReview
);

module.exports = router;
