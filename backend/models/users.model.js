const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    txt: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    pswd: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ENABLE", "DISABLE"],
      default: "ENABLE",
    },
    userType: {
      type: String,
      required: true,
      // enum: ["CLIENT", "ADMIN", "MECHANICIEN"],
      enum: ["CLIENT", "EMPLOYEE"],
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UserSchema);
module.exports = { Users };
