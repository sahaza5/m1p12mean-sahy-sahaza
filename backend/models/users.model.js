const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    role: {
      type: String,
      required: true,
      enum: ["CLIENT", "ADMIN", "MECHANICIEN"],
    },
    contact: {
      type: String,
      required: false,
      minlength: 7,
      maxlength: 20,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UserSchema);
module.exports = { Users };
