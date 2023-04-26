///Imports
const Task = require("../models/task");
const HttpError = require("../models/http-errors");
const mongoose = require("mongoose");
///Functions
//Search task by Id.
const getTaskByID = async (req, res, next) => {
  // get a task by id
  const taskID = req.params.taskID; // get the task id from the request params
  let task;
  try {
    task = await Task.findById(taskID); // find the task in the database
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a task.",
      500
    );
    return next(error);
  }
  if (!task) {
    throw new HttpError("Could not find a task for the provided id.", 404); // if the task does not exist, throw an error
  }
  res.json({ task: task.toObject({ getters: true }) });
};

const getTasks = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Task.find({}); // get all tasks from the database
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a task.",
      500
    );
    return next(error);
  }
  if (!tasks || tasks.length == 0) {
    // if the task does not exist, throw an error
    throw new HttpError("Could not find a task for the provided id.", 404);
  }
  res.json({ tasks }); // return the task to the client
};

const createTask = async (req, res, next) => {
  // create a new task
  const { name, description, tasks } = req.body; // get the data from the request body
  const createdTask = new Task({
    // create a new task object
    name,
    description,
    tasks,
  });
  try {
    await createdTask.save(); // save the new task to the database
  } catch (err) {
    const error = new HttpError("Creating task failed, please try again.", 500);
    return next(error);
  }
  res.status(201).json({ task: createdTask }); // return the new task to the client
};
const updateTask = async (req, res, next) => {
  const taskID = req.params.taskID; // get the task id from the request params
  //delete the task from the database
  try {
    await Task.findByIdAndUpdate(taskID, {
      name: "test",
      description: "test",
      tasks: [],
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update task.",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Updated task." });
};
const deleteTask = async (req, res, next) => {
  const taskID = req.params.taskID; // get the task id from the request params
  //delete the task from the database
  try {
    await Task.findByIdAndRemove(taskID);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete task.",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Deleted task." });
};

///Export module
exports.getTaskByID = getTaskByID;
exports.getTasks = getTasks;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
