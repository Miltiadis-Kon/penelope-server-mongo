//Imports
const express = require("express");
const Router = express.Router();
const operationController = require("../controllers/operation-controller");

///Define api endpoints
//GET
Router.get("/:operationID", operationController.getOperationByID); // get a operation by id
Router.get("/", operationController.getOperations); // get a operation by user id
Router.get("/tasks/:taskID/", operationController.getOperationsInTaskID); // get a operation by user id
//POST
Router.post("/", operationController.createOperation); // create a new operation

//PATCH
Router.patch("/:operationID", operationController.updateOperation); // update a operation

//DELETE
Router.delete("/:operationID", operationController.deleteOperation); // delete a operation

//Export module
module.exports = Router;
