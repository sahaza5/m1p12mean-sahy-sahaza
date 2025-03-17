const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");

const { Repairs } = require("../models/repair.model");
const { Apointments } = require("../models/apointment.model");
const { Vehicules } = require("../models/vehicule.model");
const { Payments } = require("../models/payment.model");

//--------GET REPAIR BY ID------//
const getRepairById = async (req, res) => {
  console.log("Get all repair");
  const { id } = req.params;
  try {
    const repair = await Repairs.find({ _id: id }).populate({
      path: "apointment",
      populate: {
        path: "car",
      },
    });
    return res.status(httpStatus.OK).json(repair);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
  //   return res.status(httpStatus.OK).json("test");
};

//-------GET ALL REPAIR--------//
const getAllRepair = async (req, res) => {
  console.log("Get all repair");
  try {
    // const repairs = await Repairs.find().populate({
    //   path: "apointment",
    //   populate: {
    //     path: "car",
    //   },
    // });
    const repairs = await Repairs.find().populate({
      path: "apointment",
      populate: [
        {
          path: "car",
        },
        { path: "belongsTo", select: "username _id" },
      ],
    });
    return res.status(httpStatus.OK).json(repairs);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
  //   return res.status(httpStatus.OK).json("test");
};

//-------GET ALL REPAIR OF A MECHANICIEN(HISTORIQUE)--------//
const getAllRepairForMechanicien = async (req, res) => {
  const { id } = req.params;
  console.log("Get all repair of mechanicien");
  try {
    const repairs = await Repair.find().populate({
      path: "apointment",
      match: { belongsTo: id }, // Match repairs where appointment belongsTo the specified userId
      //select: "belongsTo", // You can optionally include only the belongsTo field
    });
    return res.status(httpStatus.OK).json(repairs);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
  //   return res.status(httpStatus.OK).json("test");
};

//-----UPDATE REPAIR------//
const updateRepair = async (req, res) => {
  const { id } = req.params;
  const { service } = req.body;

  // console.log("Done repair:", id);
  console.log("The service is:", service);

  const objId = mongoose.isValidObjectId(id);
  if (!objId) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid id" });
  }

  try {
    const updatedRepair = await Repairs.findByIdAndUpdate(
      { _id: id },
      { $set: { service, status: "REPAIRING" } },
      { new: true }
    );
    return res.status(httpStatus.OK).send({ updatedRepair });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//-----------FINISH CAR REPARATION
const finishReparation = async (req, res) => {
  const { amount, clientId } = req.body;
  const { id } = req.params;
  console.log("Finish reparation of amount:", amount);

  const objId = mongoose.isValidObjectId(id);
  if (!objId) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid id" });
  }

  try {
    const updatedRepair = await Repairs.findByIdAndUpdate(
      { _id: id },
      { $set: { service, status: "DONE" } },
      { new: true }
    );
    const updateApointment = await Apointments.findByIdAndUpdate(
      {
        _id: updatedRepair._id,
      },
      {
        $set: { status: "DONE" },
      },
      { new: true }
    );
    const updateCar = await Vehicules.findByIdAndUpdate(
      {
        _id: updateApointment.car,
      },
      { status: "REPAIRED" },
      { new: true }
    );
    const pay = await Payments.create({ amount, by: clientId });
    return res.status(httpStatus.OK).send({ updatedRepair });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//--------CANCEL REPARATION------//
const cancelReparation = async (req, res) => {
  const { id } = req.params;
  console.log("Cancel reparation", id);

  const objId = mongoose.isValidObjectId(id);
  if (!objId) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid id" });
  }
  try {
    const findRepair = await Repairs.findById({ _id });
    if (
      findRepair.status !== "DONE" &&
      findRepair.status !== "PAID" &&
      findRepair.status !== "CANCELED"
    ) {
      try {
        const canceledReparation = await Repairs.findByIdAndUpdate(
          { _id: id },
          { $set: { status: "CANCELED" } },
          { new: true }
        );

        const canceledApointment = await Apointments.findByIdAndUpdate(
          { _id: canceledReparation.apointment },
          { $set: { status: "CANCELED" } },
          { new: true }
        );

        const canceledVehiculeStatus = await Vehicules.findByIdAndUpdate(
          { _id: canceledApointment.car },
          { $set: { repairStatus: "CANCELED APOINTMENT" } },
          { new: true }
        );
        return res.status(httpStatus.OK).json(canceledReparation);
      } catch (error) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: error.message });
      }
    } else {
      return res
        .status(httpStatus.FORBIDDEN)
        .send({ message: "Cannot cancel it anymore" });
    }
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = {
  getRepairById,
  getAllRepair,
  updateRepair,
  finishReparation,
  cancelReparation,
  getAllRepairForMechanicien,
};
