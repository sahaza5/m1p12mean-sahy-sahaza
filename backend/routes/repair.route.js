const express = require("express");
const routes = express.Router();
const {
  getAllRepair,
  getRepairById,
  updateRepair,
} = require("../controllers/repair.controller");

const { authentication } = require("../middleware/authentication");

//---------GET ALL REPAIR---------//
routes.get("/", getAllRepair);

//-------GET REPAIR BY ID---------//
routes.get("/:id", getRepairById);

//-------UPDATE REPAIR-------//
routes.patch("/update/:id", updateRepair);

module.exports = routes;
