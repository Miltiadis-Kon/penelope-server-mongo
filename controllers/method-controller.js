///Imports
const HttpError = require("../models/http-errors");
const uuid=require('uuid').v4;
///Functions
//Search Method by Id.
const getMethodByID = (req, res, next) => { // get a Method by id
  const methodID = req.params.methodID; // get the Method id from the request params
  const Method = DUMMY_METHODS.find((p) => { // find the Method with the id provided in the request
    return p.id === methodID; // return the Method
  });
  if (!Method) {
    throw new HttpError("Could not find a Method for the provided id.", 404); // if the Method does not exist, throw an error
  }
  res.json({ method });
};

//Search Method by UserId.
const getMethods = (req, res, next) => { // get a Method by user id
  const userID = req.params.uid; // get the user id from the request params
  const Methods = DUMMY_METHODS.filter((p) => { // find the Method with the user id provided in the request
    return p.creator === userID; // return the Method
  });

  if (!Methods ||Methods.length==0) { // if the Method does not exist, throw an error
    throw new HttpError("Could not find a Method for the provided id.", 404);
  }
  res.json({ methods }); // return the Method to the client
};
const createMethod = (req, res, next) => { // create a new Method
  const { title, description, creator, tags } = req.body; // get the data from the request body
  const createdMethod = { // create a new Method object
    id: uuid(),
    title,
    description,
    creator,
    tags,
  };
  DUMMY_METHODS.push(createdMethod); // add the new Method to the DUMMY_METHODS array
  res.status(201).json({ method: createdMethod }); // return the new Method to the client
};
const updateMethod = (req, res, next) => {    
   const { title, description } = req.body;
   const methodID = req.params.methodID;
   const updatedMethod = { ...DUMMY_METHODS.find((p) => p.id === methodID) }; //find the Method to update and copy it to a new object called updatedMethod 
   const MethodIndex = DUMMY_METHODS.findIndex((p) => p.id === methodID); // find the index of the Method to update in the DUMMY_METHODS array 
   updatedMethod.title = title;
   updatedMethod.description = description;
   DUMMY_METHODS[MethodIndex] = updatedMethod; // replace the Method in the DUMMY_METHODS array with the updated Method
   res.status(200).json({ Method: updatedMethod }); // return the updated Method
};
const deleteMethod = (req, res, next) => {
  const methodID = req.params.methodID; //get the Method id from the request
  if (!DUMMY_METHODS.find((p) => p.id === methodID)) { //check if the Method exists
    throw new HttpError("Could not find a Method for that id.", 404); //if not throw an error
  }
  DUMMY_METHODS = DUMMY_METHODS.filter((p) => p.id !== methodID); // if the Method exists, filter the DUMMY_METHODS array to remove the Method with the id provided in the request
  res.status(200).json({ message: "Deleted Method." }); // return a message to the client
};

///Export module
exports.getMethodByID = getMethodByID;
exports.getMethods= getMethods;
exports.createMethod = createMethod;
exports.updateMethod = updateMethod;
exports.deleteMethod = deleteMethod;
///Define dummy database
let DUMMY_METHODS = [
   {
     id: "p1",
     title: "Large Profile Damage",
     description: "One of the most famous sky scrapers in the world!",
     creator: "u1",
     tags: ["tag1", "tag2", "tag3"],
   }
];
