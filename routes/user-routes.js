const express = require("express");
const bodyParser = require("body-parser");
const Router = express.Router();

Router.get("/", (req, res) => {
  console.log("Hello World!");
  res.json({ message: "Hello World!" });
});

module.exports = Router;
