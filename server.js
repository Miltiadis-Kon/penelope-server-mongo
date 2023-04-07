const express = require("express");
const bodyParser = require("body-parser");
const app = express(); // create express app

const taskRouter = require("./routes/tasks-routes");
const MongoPractice = require("./mongo");
app.use(bodyParser.json()); // parse requests of content-type - application/json

app.post('/products',MongoPractice.createProduct);
app.get('/products',MongoPractice.getProducts); 

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
