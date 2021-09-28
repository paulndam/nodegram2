const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/api/auth/signin").post(authController.signin);
router.route("/api/auth/signout").get(authController.signout);

module.exports = router;
