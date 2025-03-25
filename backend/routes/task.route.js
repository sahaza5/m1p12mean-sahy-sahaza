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
// routes.get("/", getAllTasks);
routes.get("/", authentication, authorizationAdmin, getAllTasks);

//-----GET TASK BY ID-----
// routes.get("/:id", getTaskbyId);
routes.get("/:id", authentication, getTaskbyId);

//----GET TASK OF A MECHANICIEN------
// routes.get("/mechanicien/:id", getTaskMechanicien);
routes.get(
  "/mechanicien/:id",
  authentication,
  authorizationResponsable,
  getTaskMechanicien
);

//----SET/UPDATE TASK STATUS---------
// routes.patch("/update/:id", updateTaskStatus);
routes.patch(
  "/update/:id",
  authentication,
  authorizationResponsable,
  updateTaskStatus
);

module.exports = routes;
