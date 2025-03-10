const { default: mongoose } = require("mongoose");
const { Vehicules } = require("../models/vehicule.model");
const httpStatus = require("http-status-codes");

const getAllVehicules = async (req, res) => {
  console.log("Get all vehicules");
  try {
    const vehicules = await Vehicules.find({}).populate("customer");
    return res.status(httpStatus.OK).send(vehicules);
  } catch (error) {
    return res.stats(httpStatus.BAD_REQUEST).json({ message: error.message });
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
      customer: req.user.id,
      name,
      model,
      licensePlate,
    });
    //     // Populate the customer field
    //     const populatedVehicle = await Vehicle.findById(newVehicle._id).populate('customer');
    return res.status(httpStatus.OK).json(newRegister);
  } catch (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .message({ message: error.message });
  }
};

module.exports = { getAllVehicules, registerVehicule };
