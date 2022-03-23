// const mongoose = require("mongoose");
import dotenv from "dotenv";
import cors from "cors";
import app from "./app"
import mongoose,{ ConnectOptions } from "mongoose";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
dotenv.config();
const port = process.env.PORT || 4000



const connect = async () => {
  try {
    const DB = process.env.DB.replace("<password>", process.env.PASSWORD);
  await  mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }as ConnectOptions);
    console.log("mongodb connected");
  } catch (e) {
    console.log("error connecting to mongoose");
    process.exit(1);
  }
};
connect();

app.listen(port, () => {
  console.log("listening on port " + port);
});
