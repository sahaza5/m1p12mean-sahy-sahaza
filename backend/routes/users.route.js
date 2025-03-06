const express = require("express");

const {
  getAllUsers,
  getUserById,
  registerClient,
  addMechanicien,
  clientLogin,
} = require("../controllers/users.controller");

const { authentication } = require("../middleware/authentication");
const {
  authorizationResponsable,
  authorizationAdmin,
} = require("../middleware/authorization");

const routes = express.Router();

//User must be authenticated(logged in) before getting all users
routes.route("/").get(authentication, authorizationResponsable, getAllUsers);
routes.route("/:id").get(authentication, authorizationResponsable, getUserById);
routes.route("/register/client").post(registerClient);
routes
  .route("/add/mechanicien")
  .post(authentication, authorizationAdmin, addMechanicien);
routes.route("/client/login").post(clientLogin);

module.exports = routes;
