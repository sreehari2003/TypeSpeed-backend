const express = require("express");
const app = express();
const userRoutes = require("./routes/dataRoutes");
app.use(express.json());
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;