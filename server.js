const express = require("express");
const bodyParser = require("body-parser");
const app = express(); // create express app
const mongoose = require("mongoose");

const taskRouter = require("./routes/tasks-routes");
app.use(bodyParser.json()); // parse requests of content-type - application/json

app.use("/api/tasks/", taskRouter);
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
  .connect(
    "mongodb+srv://lms:q1w2e3r4t5@cluster0.sy4ywdt.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
