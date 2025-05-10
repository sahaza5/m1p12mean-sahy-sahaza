const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");

const isValidId = (id) => {
  return mongoose.isValidObjectId(id);
};

module.exports = { isValidId };
