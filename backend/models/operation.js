const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OperationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  action_ids: { type: Array, required: true },
  parallelActions: { type: Boolean, required: true },
});

//Create Model from Schema and export
module.exports = mongoose.model("Operation", OperationSchema);
