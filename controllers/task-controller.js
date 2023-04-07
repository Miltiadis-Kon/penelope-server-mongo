///Imports
const HttpError = require("../models/http-errors");
const uuid=require('uuid').v4;
///Functions
//Search task by Id.
const getTaskByID = (req, res, next) => { // get a task by id
  const taskID = req.params.taskID; // get the task id from the request params
  const task = DUMMY_TASKS.find((p) => { // find the task with the id provided in the request
    return p.id === taskID; // return the task
  });
  if (!task) {
    throw new HttpError("Could not find a task for the provided id.", 404); // if the task does not exist, throw an error
  }
  res.json({ task: task });
};

//Search task by UserId.
const getTaskByUserID = (req, res, next) => { // get a task by user id
  const userID = req.params.uid; // get the user id from the request params
  const tasks = DUMMY_TASKS.filter((p) => { // find the task with the user id provided in the request
    return p.creator === userID; // return the task
  });

  if (!tasks ||tasks.length==0) { // if the task does not exist, throw an error
    throw new HttpError("Could not find a task for the provided id.", 404);
  }
  res.json({ tasks }); // return the task to the client
};
const createTask = (req, res, next) => { // create a new task
  const { title, description, creator, tags } = req.body; // get the data from the request body
  const createdTask = { // create a new task object
    id: uuid(),
    title,
    description,
    creator,
    tags,
  };
  DUMMY_TASKS.push(createdTask); // add the new task to the DUMMY_TASKS array
  res.status(201).json({ task: createdTask }); // return the new task to the client
};
const updateTask = (req, res, next) => {    
   const { title, description } = req.body;
   const taskID = req.params.taskID;
   const updatedTask = { ...DUMMY_TASKS.find((p) => p.id === taskID) }; //find the task to update and copy it to a new object called updatedTask 
   const taskIndex = DUMMY_TASKS.findIndex((p) => p.id === taskID); // find the index of the task to update in the DUMMY_TASKS array 
   updatedTask.title = title;
   updatedTask.description = description;
   DUMMY_TASKS[taskIndex] = updatedTask; // replace the task in the DUMMY_TASKS array with the updated task
   res.status(200).json({ task: updatedTask }); // return the updated task
};
const deleteTask = (req, res, next) => {
  const taskID = req.params.taskID; //get the task id from the request
  if (!DUMMY_TASKS.find((p) => p.id === taskID)) { //check if the task exists
    throw new HttpError("Could not find a task for that id.", 404); //if not throw an error
  }
  DUMMY_TASKS = DUMMY_TASKS.filter((p) => p.id !== taskID); // if the task exists, filter the DUMMY_TASKS array to remove the task with the id provided in the request
  res.status(200).json({ message: "Deleted task." }); // return a message to the client
};

///Export module
exports.getTaskByID = getTaskByID;
exports.getTaskByUserID = getTaskByUserID;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
///Define dummy database
let DUMMY_TASKS = [
   {
     id: "p1",
     title: "Large Profile Damage",
     description: "One of the most famous sky scrapers in the world!",
     creator: "u1",
     tags: ["tag1", "tag2", "tag3"],
   }
];
