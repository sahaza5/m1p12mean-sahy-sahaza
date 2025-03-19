const express = require("express");
const routes = express.Router();
const {
  getAllRepair,
  getRepairById,
  updateRepair,
  finishReparation,
  getAllRepairForMechanicien,
  cancelReparation,
} = require("../controllers/repair.controller");

const { authentication } = require("../middleware/authentication");

//---------GET ALL REPAIR---------//
routes.get("/", authentication, getAllRepair);

//-------GET REPAIR BY ID---------//
routes.get("/:id", authentication, getRepairById);

//-------UPDATE REPAIR-------//
routes.patch("/update/:id", authentication, updateRepair);

//-----FINISH REPAIR------//
routes.post("/finish/:id", authentication, finishReparation);

//-----CANCEL REPAIR-//
routes.post("/cancel/:id", authentication, cancelReparation);

//------FIND ALL REPAIRS/HISTORIC OF REPAIR FOR A SPECIFIC MECHANICIEN
routes.post("/mechanicien/:id", authentication, getAllRepairForMechanicien);

module.exports = routes;
