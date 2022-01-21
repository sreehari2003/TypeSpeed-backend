const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
const userRoutes = require("./routes/dataRoutes");
app.get("/",(req,res)=>{
 res.send("<h1>hello world</h1>");
})
app.use(express.json());
app.use("/api", userRoutes);

module.exports = app;
