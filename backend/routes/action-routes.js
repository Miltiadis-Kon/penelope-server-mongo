//Imports
const express = require("express");
const Router = express.Router();
const actionController = require("../controllers/action-controller");

///Define api endpoints
//GET
Router.get("/:actionID", actionController.getActionByID); // get a action by id
Router.get("/", actionController.getActions); // get a action by user id
Router.get(
  "/operations/:operationID/",
  actionController.getActionsInOperationID
); // get a action by operation id

//POST
Router.post("/", actionController.createAction); // create a new action

//PATCH
Router.patch("/:actionID", actionController.updateAction); // update a action

//DELETE
Router.delete("/:actionID", actionController.deleteAction); // delete a action

//Export module
module.exports = Router;
