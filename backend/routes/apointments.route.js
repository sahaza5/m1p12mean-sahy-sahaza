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
  getApointmentById,
  bookApointment,
} = require("../controllers/apointment.controller");

//-------------GET ALL APOINTMENTS SPECIFIC FOR ADMIN--------//
routes.get(
  "/admin",
  authentication,
  authorizationAdmin,
  getAllApointmentsForAdminRole
);

//-------------GET ALL APOINTMENTS OF A MECHANICIEN--------//
routes.get(
  "/mechanicien/:mechanicien",
  authentication,
  authorizationResponsable,
  getAllApointmentsForResponsable
);

//-----------GET AN APOINTMENT BY ID-----------//
routes.get("/:id", authentication, getApointmentById);

//-------------CLIENT BOOKING APOINTMENT--------//
routes.post("/bookApointment", authentication, bookApointment);

module.exports = routes;
