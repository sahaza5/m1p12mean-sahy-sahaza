const express = require("express");

const {
  // getAllUsers,
  getUserById,
  register,
  addMechanicien,
  getAllMechanicien,
  login,
  disableMechanicien,
  setProfile,
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
routes.route("/").get(authentication, authorizationAdmin, getAllMechanicien);

//-------GET ALL CLIENTS
routes.route("/client").get(authentication, authorizationAdmin, getAllClient);

//----GET USER DATA-----//
routes.route("/userdata/").get(authentication, getUserData);

//----GET ONE USER ROUTE------//
//User must be authenticated(logged in) and have the privilege before getting all users
routes.route("/:id").get(authentication, getUserById);

//----REGISTER ROUTE----//
routes.route("/register").post(register);

//----ADD MECHANICIEN ROUTE----//
routes
  .route("/add/mechanicien")
  .post(authentication, authorizationAdmin, addMechanicien);

//-----DELETE/LAY DOWN A MECHANICIEN ROUTE-----//
routes
  .route("/disable/mechanicien/:id")
  .patch(authentication, authorizationAdmin, disableMechanicien);

//----LOG IN ROUTE----//
routes.route("/login").post(login);

//----SET PROFILE  ROUTE----//
routes.route("/setProfile/:id").patch(authentication, setProfile);

//-----REACTIVATE USER ACCOUNT---//

routes
  .route("/reactivate/:id")
  .patch(authentication, authorizationAdmin, reactivateAccount);

module.exports = routes;
