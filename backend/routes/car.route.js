const express = require("express");
const routes = express.Router();
const {
  getAllVehiculesForClient,
  updateVehicule,
  registerVehicule,
  deleteVehicule,
  upload,
  getVehiculeById,
} = require("../controllers/vehicule.controller");

const { authentication } = require("../middleware/authentication");

//-----------GET ALL VEHICULES FOR CLIENT
routes.get("/:id", authentication, getAllVehiculesForClient);

//-----------REGISTER A VEHICULE-------//
routes.post(
  "/register/:id",
  authentication,
  upload.single("image"),
  registerVehicule
);

//-----------UPDATE A VEHICULE--------//
routes.patch("/:id", authentication, upload.single("image"), updateVehicule);

//----------GET VEHICULE BY ID------//
routes.get("/vehicule/:id", authentication, getVehiculeById);

//--------DELETE VEHICULE BY ID------//
routes.delete("/:id", authentication, deleteVehicule);

module.exports = routes;
