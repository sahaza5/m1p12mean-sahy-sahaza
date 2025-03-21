const express = require("express");
const routes = express.Router();
const {
  getAllTasks,
  getTaskbyId,
  getTaskMechanicien,
  updateTaskStatus,
} = require("../controllers/task.controller");

const { authentication } = require("../middleware/authentication");
const {
  authorizationResponsable,
  authorizationAdmin,
} = require("../middleware/authorization");

//-----GET ALL TASKS-----
routes.get("/", getAllTasks);

//-----GET TASK BY ID-----
routes.get("/:id", getTaskbyId);

//----GET TASK OF A MECHANICIEN------
routes.get("/mechanicien/:id", getTaskMechanicien);

//----SET/UPDATE TASK STATUS---------
routes.patch("/update/:id", updateTaskStatus);

module.exports = routes;
