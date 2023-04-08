///Imports
const HttpError = require("../models/http-errors");
const uuid = require("uuid").v4;
const Action = require("../models/action");
///Functions

//Search action by Id.
const getActionByID = (req, res, next) => {
  // get a task by id
  const actionID = req.params.actionID; // get the task id from the request params
  const action = DUMMY_ACTIONS.find((p) => {
    // find the task with the id provided in the request
    return p.id === actionID; // return the task
  });
  if (!action) {
    throw new HttpError("Could not find an actionID for the provided id.", 404); // if the task does not exist, throw an error
  }
  res.json({ action });
};
//Search task by UserId.
const getActions = (req, res, next) => {
  // get a task by user id
  const actions = DUMMY_ACTIONS;
  if (!actions || actions.length == 0) {
    // if the task does not exist, throw an error
    throw new HttpError("Could not find a task for the provided id.", 404);
  }
  res.json({ actions }); // return the task to the client
};
//Search task by UserId.
const getActionsInOperationID = (req, res, next) => {
  // get a task by user id
  const actionID = req.params.uid; // get the user id from the request params
  const actions = DUMMY_ACTIONS.filter((p) => {
    // find the task with the user id provided in the request
    return p.creator === userID; // return the task
  });

  if (!actions || actions.length == 0) {
    // if the task does not exist, throw an error
    throw new HttpError("Could not find a task for the provided id.", 404);
  }
  res.json({ actions }); // return the task to the client
};

const createAction = (req, res, next) => {
  // create a new task
  const { title, description, creator, tags } = req.body; // get the data from the request body
  const createAction = {
    // create a new task object
    id: uuid(),
    title,
    description,
    creator,
    tags,
  };
  DUMMY_ACTIONS.push(createAction); // add the new task to the DUMMY_ACTIONS array
  res.status(201).json({ task: createAction }); // return the new task to the client
};
const updateAction = (req, res, next) => {
  const { title, description } = req.body;
  const actionID = req.params.actionID;
  const updatedAction = { ...DUMMY_ACTIONS.find((p) => p.id === actionID) }; //find the task to update and copy it to a new object called updatedAction
  const actionIndex = DUMMY_ACTIONS.findIndex((p) => p.id === actionID); // find the index of the task to update in the DUMMY_ACTIONS array
  updatedAction.title = title;
  updatedAction.description = description;
  DUMMY_ACTIONS[actionIndex] = updatedAction; // replace the task in the DUMMY_ACTIONS array with the updated task
  res.status(200).json({ task: updatedAction }); // return the updated task
};
const deleteAction = (req, res, next) => {
  const actionID = req.params.actionID; //get the task id from the request
  if (!DUMMY_ACTIONS.find((p) => p.id === actionID)) {
    //check if the task exists
    throw new HttpError("Could not find a task for that id.", 404); //if not throw an error
  }
  DUMMY_ACTIONS = DUMMY_ACTIONS.filter((p) => p.id !== actionID); // if the task exists, filter the DUMMY_ACTIONS array to remove the task with the id provided in the request
  res.status(200).json({ message: "Deleted task." }); // return a message to the client
};

///Export module
exports.getActionByID = getActionByID;
exports.getActions = getActions;
exports.getActionsInOperationID = getActionsInOperationID;
exports.createAction = createAction;
exports.updateAction = updateAction;
exports.deleteAction = deleteAction;
///Define dummy database
let DUMMY_ACTIONS = [
  {
    id: "p1",
    title: "Large Profile Damage",
    description: "One of the most famous sky scrapers in the world!",
    creator: "u1",
    tags: ["tag1", "tag2", "tag3"],
  },
];
