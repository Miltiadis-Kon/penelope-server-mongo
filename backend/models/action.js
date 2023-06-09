const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  actionType: { type: String, required: true },
  tool_id: { type: Number, required: true },
  workspace_id: { type: Number, required: true },
  operation_id: { type: String, required: true },
  position: { type: Number, required: true },
});

//Create Model from Schema and export
module.exports = mongoose.model("Action", ActionSchema);
