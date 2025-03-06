const express = require("express");

const {
  getAllUsers,
  getUserById,
  registerClient,
  addMechanicien,
  clientLogin,
} = require("../controllers/users.controller");

const { authentication } = require("../middleware/authentication");

const routes = express.Router();

//User must be authenticated(logged in) before getting all users
routes.route("/").get(getAllUsers);
routes.route("/:id").get(getUserById);
routes.route("/register/client").post(registerClient);
routes.route("/add/mechanicien").post(addMechanicien);
routes.route("/client/login").post(clientLogin);

module.exports = routes;
