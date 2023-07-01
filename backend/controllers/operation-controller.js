///Imports
const HttpError = require("../models/http-errors");
const uuid = require("uuid").v4;
const Operation = require("../models/operation");
///Functions

//Search Operation by Id.
const getOperationByID = async (req, res, next) => {
  // get a operation by id
  const operationID = req.params.operationID; // get the operation id from the request params
  let operation;
  try {
    operation = await Operation.findById(operationID); // find the operation in the database
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a operation.",
      500
    );
    return next(error);
  }
  if (!operation) {
    throw new HttpError("Could not find a operation for the provided id.", 404); // if the operation does not exist, throw an error
  }
  res.json({ operation: operation.toObject({ getters: true }) });
};
//Search operation by UserId.
const getOperations = async (req, res, next) => {
  let operation;
  try {
    operation = await Operation.find({}); // get all operation from the database
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a task.",
      500
    );
    return next(error);
  }
  if (!operation || operation.length == 0) {
    // if the task does not exist, throw an error
    throw new HttpError("Could not find a task for the provided id.", 404);
  }
  res.json({ operation }); // return the task to the client
};
//Search operation by UserId.
const getOperationsInTaskID = async (req, res, next) => {
  const taskID = req.params.taskID; // get the operation id from the request params
  let operation;
  try {
    operation = await Operation.find({ task_id: taskID }); // get all operation from the database
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a task.",
      500
    );
    return next(error);
  }
  if (!operation || operation.length == 0) {
    // if the task does not exist, throw an error
    throw new HttpError("Could not find a task for the provided id.", 404);
  }
  res.json({ operation }); // return the task to the client
};

const createOperation = async (req, res, next) => {
  // create a new task
  const { name, description, task_id, parallelSkills, skill_ids,position } = req.body; // get the data from the request body
  const createdOperation = new Operation({
    // create a new task object
    name,
    description,
    task_id,
    parallelSkills,
    skill_ids,
    position
  });
  try {
    await createdOperation.save(); // save the new task to the database
  } catch (err) {
    const error = new HttpError("Creating task failed, please try again.", 500);
    return next(error);
  }
  res.status(201).json({ task: createdOperation }); // return the new task to the client
};
const updateOperation = (req, res, next) => {};
const deleteOperation = (req, res, next) => {};

///Export module
exports.getOperationByID = getOperationByID;
exports.getOperations = getOperations;
exports.getOperationsInTaskID = getOperationsInTaskID;
exports.createOperation = createOperation;
exports.updateOperation = updateOperation;
exports.deleteOperation = deleteOperation;
