const express = require("express");

const {
  getAllUsers,
  getUserById,
  registerClient,
  addMechanicien,
  clientLogin,
  setPassword,
  deleteMechanicien,
} = require("../controllers/users.controller");

const { authentication } = require("../middleware/authentication");
const {
  authorizationResponsable,
  authorizationAdmin,
} = require("../middleware/authorization");

const routes = express.Router();

//----GET ALL USERS ROUTE------//
//User must be authenticated(logged in) and have the privilege before getting all users
routes.route("/").get(authentication, authorizationResponsable, getAllUsers);

//----GET ONE USER ROUTE------//
//User must be authenticated(logged in) and have the privilege before getting all users
routes.route("/:id").get(authentication, authorizationResponsable, getUserById);

//----REGISTER ROUTE----//
routes.route("/register/client").post(registerClient);

//----ADD MECHANICIEN ROUTE----//
//User must be authenticated(logged in) and be an admin before getting all users
routes
  .route("/add/mechanicien")
  .post(authentication, authorizationAdmin, addMechanicien);

//-----DELETE/LAY DOWN A MECHANICIEN ROUTE-----//
routes
  .route("/delete/mechanicien/:id")
  .patch(authentication, authorizationAdmin, deleteMechanicien);
//----CLIENT LOG IN ROUTE----//
routes.route("/client/login").post(clientLogin);

//----SET PASSWORD  ROUTE----//
routes.route("/client/setPassword").patch(setPassword);

module.exports = routes;
