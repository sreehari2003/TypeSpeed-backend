
import dotenv from "dotenv";
import cors from "cors";
import app from "./app"
import mongoose,{ ConnectOptions } from "mongoose";

const corsOptions = {
  origin: ["https://typeintern.netlify.app/","http://localhost:4000/","https://typespeednext.herokuapp.com/"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

dotenv.config();
const port = process.env.PORT || 4000

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

const connect = async () => {
  try {
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
