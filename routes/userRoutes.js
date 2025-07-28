const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verifyToken = require("../utils/middleware");

router.get("/get-all-users", verifyToken, userController.getAllUsers);
router.get("/get-single-user", verifyToken, userController.getSingleUser);
router.put("/update-user/:id", verifyToken, userController.updateUser);
router.delete("/delete-user/:id", verifyToken, userController.deleteUser);

module.exports = router;
