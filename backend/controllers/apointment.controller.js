const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");

const { Apointments } = require("../models/apointment.model");
const { Users } = require("../models/users.model");

//---------------GET ALL APOINTMENTS SPECIFIC FOR ADMIN-------//
const getAllApointmentsForAdminRole = async (req, res) => {
  console.log("Get all apointments for admin: ", req.user);
  //   const { mechanicien, belongsTo } = req.params;
  try {
    //IN CASE IT WANTS ALL APOINTMENTS
    const apointments = await Apointments.find({});
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
  console.log(
    "Get all apointments for responsable(mostly for mechanicien): ",
    req.user
  );
  if (req.user.role === "MECHANICIEN" || req.user.role === "ADMIN") {
    try {
      const apointments = await Apointments.find({ assignedTo: id });
      console.log(apointments);
      return res.status(httpStatus.OK).send(apointments);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    }
  }
  //--------IN CASE HE IS TRYING TO GET FOR ANOTHER MECHANICIEN
  else {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Unauthorized access" });
  }
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
    const myApointment = await Apointments.findById({ _id: id });
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
    const myApointment = await Apointments.find({ belongsTo: id });
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
  console.log("Book an apointment");
  const { title, description, car, image, service } = req.body;
  console.log(
    `Title:${title},description:${description},belongsTo:${req.user.username},image:${image}`
  );
  try {
    const booking = await Apointments.create({
      title,
      description,
      belongsTo: req.user.username,
      image,
      service,
      car,
    });
    return res.status(httpStatus.CREATED).json(booking);
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
};
