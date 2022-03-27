import express from "express";
import {sendData ,updateScore,getOneUser,postData,getAllUsers,protect,deleteAccount,findUser} from "../controller/data"
const router = express.Router();
router.route("/users").get(getAllUsers).post(findUser,postData);

router.route("/users/:id").get(protect,getOneUser).patch(protect,updateScore).delete(protect,deleteAccount);

router.route("/text").get(sendData);
module.exports = router;
