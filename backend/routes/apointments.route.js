const express = require("express");
const routes = express.Router();
const { authentication } = require("../middleware/authentication");
const {
  authorizationAdmin,
  authorizationResponsable,
} = require("../middleware/authorization");
const {
  getAllApointmentsForAdminRole,
  getAllApointmentsForResponsable,
  bookApointment,
} = require("../controllers/apointment.controller");

//-------------GET ALL APOINTMENTS SPECIFIC FOR ADMIN--------//
routes.get(
  "/admin",
  authentication,
  authorizationAdmin,
  getAllApointmentsForAdminRole
);

routes.get(
  "/mechanicien/:mechanicien",
  authentication,
  authorizationResponsable,
  getAllApointmentsForResponsable
);

//-------------CLIENT BOOKING APOINTMENT--------//
routes.post("/bookApointment", authentication, bookApointment);

module.exports = routes;
