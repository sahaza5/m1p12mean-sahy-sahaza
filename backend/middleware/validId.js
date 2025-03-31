const mongoose = require("mongoose");

const isValidId = (req, res, id) => {
  if (mongoose.isValidObjectId(id)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid id" });
  }
};

module.exports = { isValidId };
