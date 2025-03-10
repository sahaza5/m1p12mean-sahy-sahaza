const express = require("express");
const routes = express.Router();
const {
  getAllVehicules,
  registerVehicule,
} = require("../controllers/vehicule.controller");

const { authentication } = require("../middleware/authentication");

routes.get("/", authentication, getAllVehicules);
routes.post("/register", authentication, registerVehicule);

module.exports = routes;
