require("dotenv").config();

const express = require("express");
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.status(404).send("Error 404! Page Not Found!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listnening on Port: ${port}`);
});
