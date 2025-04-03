const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
const { isValidId } = require("../middleware/validId");
const { Apointments } = require("../models/apointment.model");
const { Repairs } = require("../models/repair.model");
const { Vehicules } = require("../models/vehicule.model");
const { Tasks } = require("../models/task.model");

//---------------GET ALL APOINTMENTS SPECIFIC FOR ADMIN-------//
const getAllApointmentsForAdminRole = async (req, res) => {
  try {
    //IN CASE IT WANTS ALL APOINTMENTS
    const apointments = await Apointments.find({})
      .populate("assignedTo")
      .populate("car")
      .populate("belongsTo")
      .sort({ createdAt: -1 });
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

  isValidId(res, id);

  try {
    const apointments = await Apointments.find({ assignedTo: id })
      .populate("belongsTo", "-pswd")
      .populate("car")
      .populate("assignedTo", "-pswd")
      .sort({ createdAt: -1 });
    console.log(apointments);
    return res.status(httpStatus.OK).send(apointments);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//GET AN APOINTMENT BY ID
const getApointmentById = async (req, res, next) => {
  const { id } = req.params;
  console.log("Get apointment by id ", id);

  if (!isValidId(id)) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid id" });
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

  if (!isValidId(id)) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid id" });
  }

  try {
    const myApointment = await Apointments.find({ belongsTo: id })
      .populate("car")
      .populate("assignedTo", "-pswd")
      .sort({ createdAt: -1 });
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

  if (!isValidId(userId) || !isValidId(vehicleId)) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid id" });
  }

  try {
    const booking = await Apointments.create({
      description,
      date: new Date(date),
      belongsTo: userId,
      car: vehicleId,
    });

    return res.status(httpStatus.CREATED).json(booking);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//-----------CANCEL APOINTMENT-------//
const cancelApointment = async (req, res) => {
  const { id } = req.params;
  console.log("Cancel apointment:", id);

  if (!isValidId(id)) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid id" });
  }

  try {
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

  const { date, description } = req.body;

  const { id } = req.params;
  console.log(id);

  if (!isValidId(id)) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid id" });
  }

  try {
    const updatedApointment = await Apointments.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          description: description && description,

          date: date && new Date(date),
        },
      },
      { new: true }
    );

    return res.status(200).send(updatedApointment);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//---------ADD MECHANICIEN TO APOINTMENT------
const addMechanicienToApointment = async (req, res) => {
  const { id } = req.params;
  console.log("Add mechanicien to an apointmentId:", id);

  const { mechanicien } = req.body;

  if (!isValidId(id) && !isValidId(mechanicien)) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid id" });
  }

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
