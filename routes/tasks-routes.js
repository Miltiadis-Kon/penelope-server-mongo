//Imports
const express = require("express");
const Router = express.Router();
const taskController = require("../controllers/tasks-controller");

///Define api endpoints
//GET
Router.get("/:taskID", taskController.getTaskByID);
Router.get("/user/:uid", taskController.getTaskByUserID);

//POST
Router.post("/new", taskController.createTask);
//Export module
module.exports = Router;
