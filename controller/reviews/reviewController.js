const cloudinary = require("../../config/cloudinary");
const Review = require("../../model/reviews/review");

// POST /api/reviews - Create a new review
const createReview = async (req, res) => {
  try {
    const { productId, userId, userName, rating, reviewText } = req.body;

    if (!productId || !userId || !userName || !rating || !reviewText) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Cloudinary file comes from req.file
    const productReviewImg = {
      image: req.file?.path || "",
      public_id: req.file?.filename || "",
    };

    const newReview = new Review({
      productId,
      userId,
      userName,
      rating,
      reviewText,
      productReviewImg,
    });

    await newReview.save();
    res.status(201).json({ message: "review added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating review", error: error.message });
  }
};

// GET /api/reviews/:productId - Get reviews for a specific product
const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

// DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // If image exists, delete it from Cloudinary
    if (review.productReviewImg && review.productReviewImg.public_id) {
      await cloudinary.uploader.destroy(review.productReviewImg.public_id);
    }

    // Delete review from DB
    await Review.findByIdAndDelete(id);

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting review", error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByProduct,
  deleteReview,
};
