const express = require("express");
const routes = express.Router();
const {
  getAllRepair,
  getRepairById,
} = require("../controllers/repair.controller");

const { authentication } = require("../middleware/authentication");

//---------GET ALL REPAIR---------//
routes.get("/", getAllRepair);
routes.get("/:id", getRepairById);

module.exports = routes;
