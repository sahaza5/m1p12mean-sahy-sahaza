const { default: mongoose } = require("mongoose");
const { Vehicules } = require("../models/vehicule.model");
const httpStatus = require("http-status-codes");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

//----------MULTER SETTING-------//
const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

let upload = multer({ storage: myStorage });

const getAllVehiculesForClient = async (req, res) => {
  console.log("Get all vehicules for Client");
  try {
    const vehicules = await Vehicules.find({
      // customer: req.params.id,
      customer: req.user.id,
    }).populate("customer");
    // console.log(vehicules);
    return res.status(httpStatus.OK).send(vehicules);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

const getVehiculeById = async (req, res) => {
  console.log("Get vehicule by id ");
  try {
    const vehicules = await Vehicules.find({
      // customer: req.params.id,
      _id: req.user.id,
    }).populate("customer");
    // console.log(vehicules);
    return res.status(httpStatus.OK).send(vehicules);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

const updateVehicule = async (req, res) => {
  console.log("Update vehicule by id", req.params);
  const { id } = req.params;
  const { name, model, licensePlate } = req.body;
  try {
    const updatedVehicule = await Vehicules.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: name && name,
          model: model && model,
          licensePlate: licensePlate && licensePlate,
        },
      },
      {
        new: true,
      }
    );
    return res.status(httpStatus.OK).json(updatedVehicule);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

const registerVehicule = async (req, res) => {
  console.log("Register vehicule");
  const { id } = req.params;
  const vehicle = req.body;
  vehicle.image = req.file.filename;
  try {
    const newRegister = await Vehicules.create({
      // customer: req.user.id,
      customer: id,
      name: vehicle.name,
      image: vehicle.image,
      description: vehicle.description,
    });
    //     // Populate the customer field
    //     const populatedVehicle = await Vehicle.findById(newVehicle._id).populate('customer');
    return res.status(httpStatus.OK).json(newRegister);
  } catch (error) {
    console.log(error.message);
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

const deleteVehicule = async (req, res) => {
  console.log("Delete a vehicule:", req.params.id);
  const { id } = req.params;
  try {
    const deletedVehicule = await Vehicules.findByIdAndDelete({ _id: id });
    return res.status(httpStatus.OK).json(deletedVehicule);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  getAllVehiculesForClient,
  deleteVehicule,
  registerVehicule,
  getVehiculeById,
  upload,
  updateVehicule,
};
