const { default: mongoose } = require("mongoose");
const { Vehicules } = require("../models/vehicule.model");
const httpStatus = require("http-status-codes");

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
  console.log("Update vehicule by id");
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
  const { name, model, licensePlate } = req.body;
  // const objId = mongoose.isValidObjectId(customer);
  // if (!objId) {
  //   return res
  //     .status(httpStatus.BAD_REQUEST)
  //     .send({ message: "Invalid user ID" });
  // }
  // if (customer !== req.user.id) {
  //   return res
  //     .status(httpStatus.FORBIDDEN)
  //     .send({ message: "Forbidden access" });
  // }
  try {
    const newRegister = await Vehicules.create({
      customer: req.user._id,
      name,
      model,
      licensePlate,
    });
    //     // Populate the customer field
    //     const populatedVehicle = await Vehicle.findById(newVehicle._id).populate('customer');
    return res.status(httpStatus.OK).json(newRegister);
  } catch (error) {
    console.log(error.message)
    // return res
    //   .status(httpStatus.BAD_REQUEST)
    //   .message({ message: error.message });
  }
};

module.exports = {
  getAllVehiculesForClient,
  registerVehicule,
  getVehiculeById,
  updateVehicule,
};
