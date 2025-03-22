const express = require("express");

const {
  getAllUsers,
  getUserById,
  register,
  addMechanicien,
  getAllMechanicien,
  // clientLogin,
  login,
  disableMechanicien,
  // setPassword,
  setProfile,
  // deleteMechanicien,
  reactivateAccount,
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
// routes.route("/userdata/:id").get(authentication, getUserData);
routes.route("/userdata/").get(authentication, getUserData);

//----GET ONE USER ROUTE------//
//User must be authenticated(logged in) and have the privilege before getting all users
// routes.route("/:id").get(authentication, authorizationResponsable, getUserById);

// routes.route("/:id").get(authentication, getUserById);
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
// routes
//   .route("/delete/mechanicien/:id")
//   .patch(authentication, authorizationAdmin, disableMechanicien);
routes.route("/disable/mechanicien/:id").patch(disableMechanicien);

//----LOG IN ROUTE----//
routes.route("/login").post(login);

//----SET PROFILE  ROUTE----//
// routes.route("/client/setPassword").patch(setPassword);
routes.route("/setProfile/:id").patch(setProfile);

//-----REACTIVATE USER ACCOUNT---//
routes.route("/reactivate/:id").patch(reactivateAccount);

module.exports = routes;
