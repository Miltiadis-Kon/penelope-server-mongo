const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ToolSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  weight: { type: Number, required: true },
  length: { type: Number, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  types: { type: Array, required: true },
  subParts: { type: Array, required: true },
});

//Create Model from Schema and export
module.exports = mongoose.model("Tool", ToolSchema);
