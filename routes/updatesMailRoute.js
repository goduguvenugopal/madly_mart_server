const express = require("express");
const updatesMailController = require("../controller/updatesMailController");
const router = express.Router();
 
router.post("/send-updates", updatesMailController)

module.exports = router
