///Imports
const HttpError = require("../models/http-errors");
///Functions
//Search task by Id.
const getTaskByID = (req, res, next) => {
  const taskID = req.params.taskID;
  const task = DUMMY_TASKS.find((p) => {
    return p.id === taskID;
  });
  if (!task) {
    throw new HttpError("Could not find a task for the provided id.", 404);
  }
  res.json({ task: task });
};

//Search task by UserId.
const getTaskByUserID = (req, res, next) => {
  const userId = req.params.uid;
  const task = DUMMY_TASKS.find((p) => {
    return p.creator === userId;
  });
  if (!task) {
    throw new HttpError("Could not find a task for the provided id.", 404);
  }
  res.json({ task: task });
};
const createTask = (req, res, next) => {
  const { title, description, creator, tags } = req.body;
  const createdTask = {
    title,
    description,
    creator,
    tags,
  };
  DUMMY_TASKS.push(createdTask);
  res.status(201).json({ task: createdTask });
};

///Export module
exports.getTaskByID = getTaskByID;
exports.getTaskByUserID = getTaskByUserID;
exports.createTask = createTask;
///Define dummy database
const DUMMY_TASKS = [
  {
    id: "p1",
    title: "Large Profile Damage",
    description: "One of the most famous sky scrapers in the world!",
    creator: "u1",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: "p1",
    title: "Small Profile Damage",
    description: "You know!",
    creator: "u1",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: "p1",
    title: "SCARF",
    description: "One of the most beautiful places in the world!",
    creator: "u1",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: "p2",
    title: "Test",
    description: "One of the most famous sky scrapers in the world!",
    creator: "u1",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: "p2",
    title: "Windows Assembly",
    description: "One of the most famous sky scrapers in the world!",
    creator: "u1",
    tags: ["tag1", "tag2", "tag3"],
  },
];
