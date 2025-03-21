const express = require("express");

const {
  getAllUsers,
  getUserById,
  register,
  addMechanicien,
  getAllMechanicien,
  // clientLogin,
  login,
  // setPassword,
  setProfile,
  deleteMechanicien,
  getAllClient,
  getUserData,
} = require("../controllers/users.controller");

const { authentication } = require("../middleware/authentication");
const {
  authorizationResponsable,
  authorizationAdmin,
} = require("../middleware/authorization");

const routes = express.Router();

//----GET ALL USERS ROUTE------//
//User must be authenticated(logged in) and have the privilege before getting all users
// routes
//   .route("/")
//   .get(authentication, authorizationResponsable, getAllMechanicien);

routes.route("/").get(getAllMechanicien);

//-------GET ALL CLIENTS
routes.route("/client").get(getAllClient);

//----GET USER DATA-----//
routes.route("/userdata").get(authentication, getUserData);

//----GET ONE USER ROUTE------//
//User must be authenticated(logged in) and have the privilege before getting all users
// routes.route("/:id").get(authentication, authorizationResponsable, getUserById);

routes.route("/:id").get(getUserById);

//----REGISTER ROUTE----//
// routes.route("/register/client").post(registerClient);
routes.route("/register").post(register);

//----ADD MECHANICIEN ROUTE----//
//User must be authenticated(logged in) and be an admin before getting all users
routes
  .route("/add/mechanicien")
  .post(authentication, authorizationAdmin, addMechanicien);

//-----DELETE/LAY DOWN A MECHANICIEN ROUTE-----//
routes
  .route("/delete/mechanicien/:id")
  .patch(authentication, authorizationAdmin, deleteMechanicien);
//----LOG IN ROUTE----//
routes.route("/login").post(login);

//----SET PASSWORD  ROUTE----//
// routes.route("/client/setPassword").patch(setPassword);
routes.route("/setProfile").patch(setProfile);

module.exports = routes;
