const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const taskRouter = require("./routes/tasks-routes");
const actionRouter = require("./routes/action-routes");
const userRouter = require("./routes/users-routes");
const operationRouter = require("./routes/operation-routes");
require("dotenv").config();

const app = express(); // create express app

app.use(bodyParser.json()); // parse requests of content-type - application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //allow any domain to send requests
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" //allow these headers
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); //allow these methods
  next();
});

app.use("/api/tasks/", taskRouter);
app.use("/api/actions/", actionRouter);
app.use("/api/user/", userRouter);
app.use("/api/operations/", operationRouter);

//error handling
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
}); //only used for API routes that are not defined.

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message:
      error.message || "An unknown error occured.Please try again later.",
  });
});

//Connect to the database & start the server
mongoose
  .connect(process.env.MONGO_CLUSTER_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
