const express = require("express");
const registerUser = require("../controller/registerUser");
const checkPassword = require("../controller/checkPassword");
const checkEmail = require("../controller/checkEmail");
const userDetails = require("../controller/userDetail");
const logout = require("../controller/logout");
const updateUserDetails = require("../controller/updateUserDetails");
const { default: SearchUser } = require("../../client/src/components/SearchUser");
const router = express.Router();
//create api
router.post("/register", registerUser);
//check user email
router.post("/email", checkEmail);
//check user password
router.post("/password", checkPassword);
//login user details
router.get("/user-details", userDetails);
//log out
router.get("/logout", logout);
//update user details
router.post("/update-user", updateUserDetails);
//search user
router.post("/search-user", SearchUser);

module.exports = router;
