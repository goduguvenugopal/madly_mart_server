const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const verifyToken = require("../utils/middleware");
const upload = require("../utils/multer")

router.post("/save-product", verifyToken,upload.array("images"), productController.saveProductController);
router.get("/get-all-products", productController.getAllProducts);
router.put(
  "/update-product-details/:id",verifyToken,
  productController.updateProductDetails
);
router.delete("/delete-product/:id",verifyToken, productController.deleteProduct);
router.get("/get-single-product/:id", productController.getSingleProduct);

module.exports = router;
