const express = require("express");
const registerUser = require("../controller/registerUser");
const checkPassword = require("../controller/checkPassword");
const checkEmail = require("../controller/checkEmail");
const userDetails = require("../controller/userDetail");

const router = express.Router();

router.post("/register", registerUser);

router.post("/email", checkEmail);

router.post("/password", checkPassword);

router.get("/user-details", userDetails);
module.exports = router;
