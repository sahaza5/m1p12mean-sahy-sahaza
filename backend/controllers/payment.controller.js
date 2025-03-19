const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
const { Payments } = require("../models/payment.model");

//------GET ALL PAYMENT------//
const getAllPayments = async (req, res) => {
  console.log("Get all payments");
  try {
    const payments = await Payments.find().populate("repair").populate("by");
    return res.status(httpStatus.OK).json(payments);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

//------GET PAYMENT BY ID-------//
const getPaymentById = async (req, res) => {
  const { id } = req.params;
  console.log("Get payment by id:", id);
  try {
    const payment = await Payments.find({ _id: id })
      .populate("repair")
      .populate("by");
    return res.status(httpStatus.OK).json(payment);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

//--------PAY SERVICE--------//
const payService = async (req, res) => {
  const { id } = req.params;
  console.log("Pay the service:", id);
  try {
    const payment = await Payments.findByIdAndUpdate(
      { _id: id },
      { $set: { status: "PAID" } },
      { new: true }
    );
    return res.status(httpStatus.OK).json(payment);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
module.exports = { getAllPayments, getPaymentById, payService };
