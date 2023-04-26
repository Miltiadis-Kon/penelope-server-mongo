///Imports
const HttpError = require("../models/http-errors");
const uuid = require("uuid").v4;
const Action = require("../models/action");
///Functions

//Search action by Id.
const getActionByID = async (req, res, next) => {
  // get a action by id
  const actionID = req.params.actionID; // get the action id from the request params
  let action;
  try {
    action = await Action.findById(actionID); // find the action in the database
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a action.",
      500
    );
    return next(error);
  }
  if (!action) {
    throw new HttpError("Could not find a action for the provided id.", 404); // if the action does not exist, throw an error
  }
  res.json({ action: action.toObject({ getters: true }) });
};
//Search action by UserId.
const getActions = async (req, res, next) => {
  let actions;
  try {
    actions = await Action.find({}); // get all actions from the database
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any actions.",
      500
    );
    return next(error);
  }
  if (!actions || actions.length == 0) {
    // if the action does not exist, throw an error
    throw new HttpError("Could not find an action for the provided id.", 404);
  }
  res.json({ actions }); // return the action to the client
};
//Search action by UserId.
const getActionsInOperationID = (req, res, next) => {
  // get a action by user id
  const actionID = req.params.uid; // get the user id from the request params
  const actions = DUMMY_ACTIONS.filter((p) => {
    // find the action with the user id provided in the request
    return p.creator === userID; // return the action
  });

  if (!actions || actions.length == 0) {
    // if the action does not exist, throw an error
    throw new HttpError("Could not find a action for the provided id.", 404);
  }
  res.json({ actions }); // return the action to the client
};

const createAction = async (req, res, next) => {
  const { name, description, actionType, tool_id, workspace_id } = req.body; // get the data from the request body
  const createdAction = new Action({
    // create a new action object
    name,
    description,
    actionType,
    tool_id,
    workspace_id,
  });
  try {
    await createdAction.save(); // save the new action to the database
  } catch (err) {
    const error = new HttpError(
      "Creating action failed, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ action: createdAction }); // return the new action to the client
};
const updateAction = async (req, res, next) => {
  const actionID = req.params.actionID; // get the action id from the request params
  //delete the action from the database
  try {
    await Action.findByIdAndUpdate(actionID, {
      name: "test",
      description: "test",
      actions: [],
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update action.",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Updated action." });
};
const deleteAction = async (req, res, next) => {
  const actionID = req.params.actionID; // get the action id from the request params
  //delete the action from the database
  try {
    await Action.findByIdAndRemove(actionID);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete action.",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Deleted action." });
};

///Export module
exports.getActionByID = getActionByID;
exports.getActions = getActions;
exports.getActionsInOperationID = getActionsInOperationID;
exports.createAction = createAction;
exports.updateAction = updateAction;
exports.deleteAction = deleteAction;
