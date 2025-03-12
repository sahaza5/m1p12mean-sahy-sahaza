const express = require("express");
const routes = express.Router();
const {
  getAllVehiculesForClient,
  updateVehicule,
  registerVehicule,
  getVehiculeById,
} = require("../controllers/vehicule.controller");

const { authentication } = require("../middleware/authentication");

//-----------GET ALL VEHICULES FOR CLIENT
// routes.get("/", authentication, getAllVehicules);
routes.get("/:id", authentication, getAllVehiculesForClient);

//-----------REGISTER A VEHICULE-------//
routes.post("/register", authentication, registerVehicule);

//-----------UPDATE A VEHICULE--------//
routes.patch("/:id", authentication, updateVehicule);

//----------GET VEHICULE BY ID------//
routes.get("/vehicule/:id", authentication, getVehiculeById);

module.exports = routes;
