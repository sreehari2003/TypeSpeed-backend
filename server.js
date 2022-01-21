const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const app = require("./app");

app.use(cors());
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

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.listen(port, () => {
  console.log("listening on port " + port);
});
