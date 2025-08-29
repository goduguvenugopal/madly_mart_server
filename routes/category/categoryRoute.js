const express = require("express");
const router = express.Router();
const categoryController = require("../../controller/category/categoryController");
const verifyToken = require("../../utils/middleware");
const upload = require("../../utils/multer");

router.post(
  "/save-category-products",
  verifyToken,
  upload.single("image"),
  categoryController.saveProductCategory
);
router.get("/get-category-products", categoryController.getAllCategoryProducts);
router.put(
  "/update-category-products/:id",
  verifyToken,
  categoryController.updateCategoryProduct
);
router.delete(
  "/delete-category-products/:id",
  verifyToken,
  categoryController.deleteCategory
);

module.exports = router;
