const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const verifyToken = require("../utils/middleware");
 

router.post(
  "/save-category-products",
  verifyToken,
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
