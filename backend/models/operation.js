const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OperationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  parallelSkills: { type: Boolean, required: true },
  task_id: { type: String, required: true },
  skill_ids: [{ type: Number, required: true }],
});

//Create Model from Schema and export
module.exports = mongoose.model("Operation", OperationSchema);
