const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");

const { Apointments } = require("../models/apointment.model");
// const { Users } = require("../models/users.model");
const { Repairs } = require("../models/repair.model");
const { Vehicules } = require("../models/vehicule.model");
const { Tasks } = require("../models/task.model");

//---------------GET ALL APOINTMENTS SPECIFIC FOR ADMIN-------//
const getAllApointmentsForAdminRole = async (req, res) => {
  // console.log("Get all apointments for admin: ", req.user);
  //   const { mechanicien, belongsTo } = req.params;

  try {
    //IN CASE IT WANTS ALL APOINTMENTS
    const apointments = await Apointments.find({})
      .populate("assignedTo")
      .populate("car")
      .populate("belongsTo");
    console.log(apointments);
    return res.status(httpStatus.OK).send(apointments);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//---------------GET ALL APOINTMENTS SPECIFIC FOR RESPONSABLE(MOSTLY FOR MECHANICIEN)-------//
const getAllApointmentsForResponsable = async (req, res) => {
  const { id } = req.params;
  console.log("id is:", id);
  // console.log(
  //   "Get all apointments for responsable(mostly for mechanicien): ",
  //   req.user
  // );
  // if (req.user.role === "MECHANICIEN" || req.user.role === "ADMIN") {
  // if (
  //   userType.toUpperCase() === "EMPLOYEE" ||
  //   userType.toUpperCase() === "ADMIN"
  // ) {
  // const ied = new mongoose.Types.ObjectId(id);
  // console.log(ied);
  try {
    const apointments = await Apointments.find({ assignedTo: id })
      .populate("belongsTo", "-pswd")
      .populate("car")
      .populate("assignedTo", "-pswd");
    console.log(apointments);
    return res.status(httpStatus.OK).send(apointments);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
  // }
  //--------IN CASE HE IS TRYING TO GET FOR ANOTHER MECHANICIEN
  // else {
  //   return res
  //     .status(httpStatus.UNAUTHORIZED)
  //     .send({ message: "Unauthorized access" });
  // }
};

//GET AN APOINTMENT BY ID
const getApointmentById = async (req, res) => {
  const { id } = req.params;
  console.log("Get apointment by id ", id);
  const objId = mongoose.isValidObjectId(id);
  if (!objId) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid id" });
  }
  try {
    const myApointment = await Apointments.findById({ _id: id })
      .populate("car")
      .populate("assignedTo", "-pswd")
      .populate("belongsTo", "-pswd");
    if (!myApointment) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Apointment not found" });
    }
    return res.status(httpStatus.OK).json(myApointment);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

//-------------GET ALL APOINTMENTS FOR CLIENT-------//
const getAllApointmentForClient = async (req, res) => {
  const { id } = req.params;

  try {
    const myApointment = await Apointments.find({ belongsTo: id })
      .populate("car")
      .populate("assignedTo", "-pswd");
    if (!myApointment) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Apointment not found" });
    }
    return res.status(httpStatus.OK).json(myApointment);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

//-------TO BOOK AN APOINTMENT---------
const bookApointment = async (req, res) => {
  const { userId, vehicleId } = req.params;
  console.log("Book an apointment for car:");
  const { description, date } = req.body;
  if (
    !mongoose.isValidObjectId(userId) ||
    !mongoose.isValidObjectId(vehicleId)
  ) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid id" });
  }
  try {
    const booking = await Apointments.create({
      description,
      date: new Date(date),
      belongsTo: userId,
      car: vehicleId,
      // carName: vehicleName,
    });

    // const updateVehicule = await Vehicules.findOneAndUpdate(
    //   { _id: car },
    //   { $set: { repairStatus: "WAITING APOINTMENT" } },
    //   { new: true }
    // );

    // const newRepair = await Repairs.create({ apointment: booking._id });
    return res.status(httpStatus.CREATED).json(booking);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//-----------CANCEL APOINTMENT-------//
const cancelApointment = async (req, res) => {
  const { id } = req.params;
  console.log("Cancel apointment:", id);
  const objId = mongoose.isValidObjectId(id);
  if (!objId) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid id" });
  }
  try {
    // const findApointment = await Apointments.findById({ _id: id }).populate(
    //   "car"
    // );
    // const findRepair = await Repairs.findById({ apointment: id });
    // if (!findApointment) {
    //   return res
    //     .status(httpStatus.BAD_REQUEST)
    //     .send({ message: "Apointment not found" });
    // }
    // if (
    //   findApointment.status !== "DONE" &&
    //   findApointment.status !== "CANCELED"
    // ) {
    //   if (findRepair.status !== "DONE" && findRepair.status !== "REPAIRING")
    //     try {
    //       const canceled = await Apointments.findOneAndUpdate(
    //         { _id: id },
    //         { $set: { status: "CANCELED" } },
    //         { new: true }
    //       );
    //       if (!canceled) {
    //         return res
    //           .status(httpStatus.BAD_REQUEST)
    //           .send({ message: "Canceled failed" });
    //       }
    //       return res.status(httpStatus.OK).send(canceled);
    //     } catch (error) {
    //       return res
    //         .status(httpStatus.BAD_REQUEST)
    //         .send({ message: error.message });
    //     }
    // }

    const findApointment = await Apointments.findById({ _id: id });
    if (findApointment.status === "DONE") {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Cannot cancel" });
    }

    const canceledApointment = await Apointments.findByIdAndUpdate(
      { _id: id },
      { $set: { status: "CANCELED" } },
      { new: true }
    );
    const deleteTaskOfTheMechanicien = await Tasks.findOneAndDelete({
      apointment: id,
    });
    return res.status(httpStatus.OK).json(canceledApointment);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//------UPDATE/SET APOINTMENT-------
const updateApointment = async (req, res) => {
  console.log("Update the apointment");
  // const { date, status } = req.body;
  const { date, description } = req.body;

  const { id } = req.params;
  console.log(id);
  const validId = mongoose.isValidObjectId(id);
  if (!validId) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid ID" });
  }
  try {
    const updatedApointment = await Apointments.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          description: description && description,
          // status: status && status,
          // assignedTo: assignedTo && assignedTo,
          date: date && new Date(date),
        },
      },
      { new: true }
    );

    // const findCar = await Vehicules.findById({ _id: updatedApointment.car });
    // console.log(updatedApointment);
    // if (updateApointment) {
    //   if (
    //     updateApointment.status !== "DONE"
    //     // &&
    //     // updateApointment.status !== "CANCELED"
    //   ) {
    //     const insertNew = await Repairs.create({
    //       apointment: updatedApointment._id,
    //       car: findCar.name,
    //       // status: "REPAIRING",
    //     });
    //     console.log("Insert new is ", insertNew);

    // const [update, insert] = await Promise.all([updateApointment, insertNew]);
    // return res.status(200).send({ updateApointment, insertNew });
    return res.status(200).send(updatedApointment);

    // } else if (updateApointment.status === "DONE") {
    //   const doneRepair = await Repairs.findByIdAndUpdate(
    //     {
    //       apointment: updatedApointment._id,
    //     },
    //     { $set: { status: "DONE" } }
    //   );
    //   return res.status(200).send({ updateApointment, doneRepair });
    // }
    // } else {
    //   return res.status(httpStatus.BAD_REQUEST).send("Something went wrong");
    // }

    // try {
    //   console.log(updatedApointment._id, updatedApointment.status);
    //   const insertRepair = new Repairs.create({
    //     apointment: id,
    //     status: "REPAIRING",
    //   });
    //   // const newInsert = (await insertRepair).save();
    //   console.log("New insert is ", insertRepair);
    //   return res.status(200).json(updatedApointment, insertRepair);
    // } catch (error) {
    //   return res
    //     .status(httpStatus.BAD_REQUEST)
    //     .send({ message: "Bad request" });
    // }

    // return res.status(httpStatus.OK).send(updatedApointment);
    // return res.status(httpStatus.OK).send(updatedApointment, newInsert);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//---------ADD MECHANICIEN TO APOINTMENT------
const addMechanicienToApointment = async (req, res) => {
  const { id } = req.params;
  console.log("Add mechanicien to an apointmentId:", id);

  const validId = mongoose.isValidObjectId(id);
  if (!validId) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid ID" });
  }
  const { mechanicien } = req.body;

  try {
    const addMechanicien = await Apointments.findByIdAndUpdate(
      { _id: id },
      { $set: { assignedTo: mechanicien, status: "APPROVED" } },
      { new: true }
    );

    //---------------CREATE THE TASK HERE------------//
    const createTask = await Tasks.create({
      apointment: id,
      assignedTo: mechanicien,
    });
    console.log(createTask);
    return res.status(httpStatus.OK).json({ addMechanicien, createTask });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//67cf2e9f5879087651b841ea

module.exports = {
  getAllApointmentsForAdminRole,
  getAllApointmentsForResponsable,
  getApointmentById,
  getAllApointmentForClient,
  bookApointment,
  addMechanicienToApointment,
  cancelApointment,
  updateApointment,
};
