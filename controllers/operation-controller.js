///Imports
const HttpError = require("../models/http-errors");
const uuid = require("uuid").v4;
const Operation = require("../models/operation");
///Functions

//Search Operation by Id.
const getOperationByID = (req, res, next) => {
  // get a task by id
  const operationID = req.params.operationID; // get the task id from the request params
  const Operation = DUMMY_operations.find((p) => {
    // find the task with the id provided in the request
    return p.id === operationID; // return the task
  });
  if (!Operation) {
    throw new HttpError(
      "Could not find an operationID for the provided id.",
      404
    ); // if the task does not exist, throw an error
  }
  res.json({ Operation });
};
//Search task by UserId.
const getOperations = (req, res, next) => {
  // get a task by user id
  const operations = DUMMY_operations;
  if (!operations || operations.length == 0) {
    // if the task does not exist, throw an error
    throw new HttpError("Could not find a task for the provided id.", 404);
  }
  res.json({ operations }); // return the task to the client
};
//Search task by UserId.
const getOperationsInMethodID = (req, res, next) => {
  // get a task by user id
  const operationID = req.params.uid; // get the user id from the request params
  const operations = DUMMY_operations.filter((p) => {
    // find the task with the user id provided in the request
    return p.creator === userID; // return the task
  });

  if (!operations || operations.length == 0) {
    // if the task does not exist, throw an error
    throw new HttpError("Could not find a task for the provided id.", 404);
  }
  res.json({ operations }); // return the task to the client
};

const createOperation = (req, res, next) => {
  // create a new task
  const { title, description, creator, tags } = req.body; // get the data from the request body
  const createOperation = {
    // create a new task object
    id: uuid(),
    title,
    description,
    creator,
    tags,
  };
  DUMMY_operations.push(createOperation); // add the new task to the DUMMY_operations array
  res.status(201).json({ task: createOperation }); // return the new task to the client
};
const updateOperation = (req, res, next) => {
  const { title, description } = req.body;
  const operationID = req.params.operationID;
  const updatedOperation = {
    ...DUMMY_operations.find((p) => p.id === operationID),
  }; //find the task to update and copy it to a new object called updatedOperation
  const OperationIndex = DUMMY_operations.findIndex(
    (p) => p.id === operationID
  ); // find the index of the task to update in the DUMMY_operations array
  updatedOperation.title = title;
  updatedOperation.description = description;
  DUMMY_operations[OperationIndex] = updatedOperation; // replace the task in the DUMMY_operations array with the updated task
  res.status(200).json({ task: updatedOperation }); // return the updated task
};
const deleteOperation = (req, res, next) => {
  const operationID = req.params.operationID; //get the task id from the request
  if (!DUMMY_operations.find((p) => p.id === operationID)) {
    //check if the task exists
    throw new HttpError("Could not find a task for that id.", 404); //if not throw an error
  }
  DUMMY_operations = DUMMY_operations.filter((p) => p.id !== operationID); // if the task exists, filter the DUMMY_operations array to remove the task with the id provided in the request
  res.status(200).json({ message: "Deleted task." }); // return a message to the client
};

///Export module
exports.getOperationByID = getOperationByID;
exports.getOperations = getOperations;
exports.getOperationsInMethodID = getOperationsInMethodID;
exports.createOperation = createOperation;
exports.updateOperation = updateOperation;
exports.deleteOperation = deleteOperation;
///Define dummy database
let DUMMY_operations = [
  {
    id: "p1",
    title: "Large Profile Damage",
    description: "One of the most famous sky scrapers in the world!",
    creator: "u1",
    tags: ["tag1", "tag2", "tag3"],
  },
];
