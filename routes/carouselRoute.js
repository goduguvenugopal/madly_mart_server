const express = require("express");
const router = express.Router();
const carouselController = require("../controller/carouselController");
const verifyToken = require("../utils/middleware");
const upload = require("../utils/multer")

router.post("/save-carousel" ,verifyToken, upload.array("images"),carouselController.saveCarousel);
router.get("/get-carousel", carouselController.getCarousel);
router.put("/update-carousel/:id", verifyToken, upload.array("images"),carouselController.updateCarousel);
router.delete("/delete-carousel/:id",verifyToken, carouselController.deleteCarousel);

module.exports = router;
