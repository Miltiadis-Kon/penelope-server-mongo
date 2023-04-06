const express = require("express");
const bodyParser = require("body-parser");
const app = express(); // create express app

const taskRouter = require("./routes/tasks-routes");

app.use("/api/tasks/", taskRouter);
//error handling
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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
