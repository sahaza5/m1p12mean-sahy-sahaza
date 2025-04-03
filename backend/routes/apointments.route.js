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
  getAllApointmentForClient,
  addMechanicienToApointment,
  cancelApointment,
  updateApointment,
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
  "/mechanicien/:id",
  authentication,
  authorizationResponsable,
  getAllApointmentsForResponsable
);

//-------------GET ALL APOINTMENTS FOR CLIENT-------//
routes.get("/client/:id", authentication, getAllApointmentForClient);

//-----------GET AN APOINTMENT BY ID-----------//
routes.get("/:id", authentication, getApointmentById);

//-------------CLIENT BOOKING APOINTMENT--------//
routes.post(
  "/bookApointment/:userId/:vehicleId",
  authentication,
  bookApointment
);

//------------SET THE APOINTMENT--------//
routes.patch(
  "/setApointment/:id",
  authentication,

  updateApointment
);

//------------SET THE APOINTMENT TO A MECHANICIEN--------//
routes.patch(
  "/addMechanicienApointment/:id",
  authentication,
  authorizationAdmin,
  addMechanicienToApointment
);

//---------CANCEL APOINTMENT------//
routes.patch("/cancelApointment/:id", authentication, cancelApointment);

module.exports = routes;
