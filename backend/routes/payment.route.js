const express = require("express");
const routes = express.Router();
const {
  getAllPayments,
  getPaymentById,
  payService,
} = require("../controllers/payment.controller");

//-------GET ALL PAYMENTS ROUTE
routes.get("/", getAllPayments);

//------GET PAYMENT BY ID ROUTE
routes.get("/:id", getPaymentById);

//------PAY SERVICE
routes.patch("/", payService);

module.exports = routes;
