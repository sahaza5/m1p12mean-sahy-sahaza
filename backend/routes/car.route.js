const express = require("express");
const routes = express.Router();
const {
  getAllVehiculesForClient,
  updateVehicule,
  registerVehicule,
  deleteVehicule,
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

//--------DELETE VEHICULE BY ID------//
routes.delete("/:id", authentication, deleteVehicule);

module.exports = routes;
