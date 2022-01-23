const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const userRoutes = require("./routes/dataRoutes");
app.use(express.json());
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
