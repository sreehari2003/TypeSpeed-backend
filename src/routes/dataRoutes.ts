import express from "express";
import {sendData ,updateScore,getOneUser,postData,getAllUsers} from "../controller/data"
const router = express.Router();
router.route("/users").get(getAllUsers).post(postData);

router.route("/users/:id").get(getOneUser).put(updateScore);

router.route("/text").get(sendData);
module.exports = router;
