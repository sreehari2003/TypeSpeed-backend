const express = require("express");
const data = require("../controller/data");
const router = express.Router();
router.route("/users").get(data.getAllUsers).post(data.postData);

module.exports = router;
