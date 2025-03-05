const { default: mongoose } = require("mongoose");
const { Users } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status-codes");

//ADMIN && MECHANICIEN LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username.trim() || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Please provide credentials" });
  }
  try {
    const userCredentials = await Users.findOne({ username, password });
    if (!userCredentials) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "User not found" });
    }

    console.log("User is ", userCredentials);

    const token = jwt.sign(
      { id: userCredentials._id, username: userCredentials.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log("Token is ", token);

    return res.status(httpStatus.OK).send({ user: userCredentials, token });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = { login };
