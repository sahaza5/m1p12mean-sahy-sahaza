const express = require("express");
const routes = express.Router();
const {
  getAllVehiculesForClient,
  registerVehicule,
} = require("../controllers/vehicule.controller");

const { authentication } = require("../middleware/authentication");

//-----------GET ALL VEHICULES FOR CLIENT
// routes.get("/", authentication, getAllVehicules);
routes.get("/:id", authentication, getAllVehiculesForClient);

routes.post("/register", authentication, registerVehicule);

module.exports = routes;
