const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OperationSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  skill_ids: { type: Array, required: true },
  parallelSkills: { type: Boolean, required: true },
});

//Create Model from Schema and export
module.exports = mongoose.model("Operation", OperationSchema);