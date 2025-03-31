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
// routes.get(
//   "/admin",
//   authentication,
//   authorizationAdmin,
//   getAllApointmentsForAdminRole
// );
routes.get(
  "/admin",
  authentication,
  authorizationAdmin,
  getAllApointmentsForAdminRole
);
// routes.get("/admin", getAllApointmentsForAdminRole);

//-------------GET ALL APOINTMENTS OF A MECHANICIEN--------//
routes.get(
  "/mechanicien/:id",
  authentication,
  authorizationResponsable,
  getAllApointmentsForResponsable
);
// routes.get("/mechanicien/:id", getAllApointmentsForResponsable);

//-------------GET ALL APOINTMENTS FOR CLIENT-------//
routes.get("/client/:id", authentication, getAllApointmentForClient);
// routes.get("/client/:id", getAllApointmentForClient);

//-----------GET AN APOINTMENT BY ID-----------//
routes.get("/:id", authentication, getApointmentById);
// routes.get("/:id", getApointmentById);

//-------------CLIENT BOOKING APOINTMENT--------//
routes.post(
  "/bookApointment/:userId/:vehicleId",
  authentication,
  bookApointment
);
// routes.post("/bookApointment/:userId/:vehicleId", bookApointment);

//------------SET THE APOINTMENT--------//
routes.patch(
  "/setApointment/:id",
  authentication,
  // authorizationAdmin,
  updateApointment
);
// routes.patch("/setApointment/:id", updateApointment);

//------------SET THE APOINTMENT TO A MECHANICIEN--------//
// routes.patch("/addMechanicienApointment/:id", addMechanicienToApointment);
routes.patch(
  "/addMechanicienApointment/:id",
  authentication,
  authorizationAdmin,
  addMechanicienToApointment
);

//---------CANCEL APOINTMENT------//
routes.patch("/cancelApointment/:id", authentication, cancelApointment);
// routes.patch("/cancelApointment/:id", cancelApointment);

module.exports = routes;
