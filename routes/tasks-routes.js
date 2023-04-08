//Imports
const express = require("express");
const Router = express.Router();
const taskController = require("../controllers/task-controller");

///Define api endpoints
//GET
Router.get("/:taskID", taskController.getTaskByID); // get a task by id
Router.get("/user/:uid", taskController.getTaskByUserID); // get a task by user id

//POST
Router.post("/", taskController.createTask); // create a new task

//PATCH
Router.patch("/:taskID", taskController.updateTask); // update a task

//DELETE
Router.delete("/:taskID", taskController.deleteTask); // delete a task

//Export module
module.exports = Router;
