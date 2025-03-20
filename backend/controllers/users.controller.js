const { default: mongoose } = require("mongoose");
const { Users } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status-codes");
const { Apointments } = require("../models/apointment.model");

//GET ALL USERS
const getAllMechanicien = async (req, res) => {
  console.log("Get all Users ");
  try {
    const users = await Users.find({ userType: "EMPLOYEE" });
    return res.status(httpStatus.OK).send(users);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//GET USER DATA
const getUserData = async (req, res) => {
  return res.status(httpStatus.OK).send(req.user);
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

//REGISTER CLIENT
const register = async (req, res) => {
  const { txt, pswd, email, userType } = req.body;
  if (!txt.trim() || !pswd || !email || !userType) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Please provide credentials" });
  }

  try {
    const registerUser = await Users.create({
      txt,
      pswd,
      userType: userType.toUpperCase(),
      email,
    });
    const token = jwt.sign(
      {
        id: registerUser._id,
        txt: registerUser.txt,
        userType: registerUser.userType,
        email: registerUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(httpStatus.OK).json({ user: registerUser, token });
  } catch (error) {
    if (error.message.includes("email")) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: "The email is already taken. Please choose a different email.",
      });
    }

    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//ADD MECHANICIEN
const addMechanicien = async (req, res) => {
  const { username, contact } = req.body;
  if (!username.trim()) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Please provide credentials" });
  }
  try {
    const registerUser = await Users.create({
      username,
      password: "123",
      role: "MECHANICIEN",
      contact,
    });
    return res.status(httpStatus.OK).json(registerUser);
  } catch (error) {
    if (error.message.includes("username")) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message:
          "The mechanicien's name is already taken. Please choose a different username.",
      });
    }

    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//DELETE OR DISABLE MECHANICIEN
const deleteMechanicien = async (req, res) => {
  const { id } = req.params;
  console.log("Delete mechanicien:", id);
  const objId = mongoose.isValidObjectId(id);
  if (!objId) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid ID" });
  }
  try {
    const deletedMechanicien = await Users.findOneAndUpdate(
      { _id: id },
      { $set: { status: "DISABLE" } },
      { new: true }
    );
    if (!deletedMechanicien) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "User not found" });
    }
    const apointmentOfThisOne = await Apointments.find({
      assignedTo: id,
      status: { $ne: "DONE" },
    });

    console.log("Apointment:", apointmentOfThisOne);

    if (apointmentOfThisOne.length) {
      const deleteApointment = await Apointments.findOneAndUpdate(
        { assignedTo: id },
        { $set: { assignedTo: null } },
        { new: true }
      );
      if (!deleteApointment) {
        return res.status(httpStatus.BAD_REQUEST).send({
          message: "Something went wrong while updating the apointment",
        });
      }
      return res.status(httpStatus.OK).json(deletedMechanicien);
    }
    return res.status(httpStatus.OK).json(deletedMechanicien);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

//LOGIN ONLY
const login = async (req, res) => {
  const { email, pswd } = req.body;
  console.log(email, pswd);

  if (!email.trim() || !pswd) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Please provide credentials" });
  }
  try {
    const userCredentials = await Users.findOne({ email, pswd });
    if (!userCredentials) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "User not found" });
    }

    //IF USER ROLE IS CLIENT THEN PROCEED
    // if (userCredentials.role === "CLIENT") {
    const token = jwt.sign(
      {
        id: userCredentials._id,
        username: userCredentials.username,
        role: userCredentials.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log("User is ", userCredentials);
    console.log("Token is ", token);

    return res.status(httpStatus.OK).send({ user: userCredentials, token });
    // }

    //IF THE USER IS NOT A CLIENT
    // return res
    //   .status(httpStatus.UNAUTHORIZED)
    //   .send({ message: "Unauthorized access" });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

const setPassword = async (req, res) => {
  const { password } = req.body;
  if (!password.trim()) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Please new password" });
  }
  try {
    const newPassword = await Users.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { password } },
      { new: true }
    );

    return res.status(httpStatus.OK).json(newPassword);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = {
  // getAllUsers,
  getAllMechanicien,
  getUserById,
  register,
  addMechanicien,
  login,
  // clientLogin,
  setPassword,
  deleteMechanicien,
  getUserData,
};
