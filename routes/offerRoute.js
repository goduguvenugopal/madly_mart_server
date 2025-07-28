const express = require("express");
const {
  createOffer,
  getOffers,
  updateOffer,
} = require("../controller/offersController");
const router = express.Router();
const verifyToken = require("../utils/middleware");
 

router.post("/create-offer", verifyToken, createOffer);
router.get("/get-offer", getOffers);
router.put("/update-offer/:id", verifyToken, updateOffer);

module.exports = router;
