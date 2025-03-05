const { Users } = require("../models/users.model");

const getAllUsers = async (req, res) => {
  console.log("Get all Users ");
  const users = await Users.find({});
  return res.send(users);
};

module.exports = { getAllUsers };
