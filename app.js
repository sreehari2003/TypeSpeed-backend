const express = require("express");
const app = express();
const userRoutes = require("./routes/dataRoutes");
app.get("/",(req,res)=>{
 res.send("<h1>hello world</h1>");
})
app.use(express.json());
app.use("/api", userRoutes);

module.exports = app;
