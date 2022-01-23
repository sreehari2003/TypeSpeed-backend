const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const app = require("./app");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 4000

const DB = process.env.DB.replace("<password>", process.env.PASSWORD);

const connect = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
