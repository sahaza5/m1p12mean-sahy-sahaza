const { default: mongoose } = require("mongoose");
const { Users } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status-codes");

//GET ALL USERS
const getAllUsers = async (req, res) => {
  console.log("Get all Users ");
  try {
    const users = await Users.find({});
    return res.status(httpStatus.OK).send(users);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//GET USER BY ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log("User id is ", id);

  const objId = mongoose.isValidObjectId(id);
  if (!objId) {
    // throw new Error("Invalid Id");
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid ID" });
  }

  try {
    const user = await Users.findById({ _id: id });
    // console.log(user);
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "User not found" });
    }
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = { getAllUsers, getUserById };
