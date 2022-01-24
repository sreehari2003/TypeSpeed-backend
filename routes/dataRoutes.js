const express = require("express");
const data = require("../controller/data");
const router = express.Router();
router.route("/users").get(data.getAllUsers).post(data.postData);

router.route("/users/:id").get(data.getOneUser).put(data.updateScore);

router.route("/text").get(data.sendData);
module.exports = router;
