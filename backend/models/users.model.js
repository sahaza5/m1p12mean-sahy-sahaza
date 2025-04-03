const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    txt: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    phone: {
      type: String,
      length: 12,
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
      unique: true,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ENABLE", "DISABLE"],
      default: "ENABLE",
    },
    userType: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return ["CLIENT", "ADMIN", "EMPLOYEE"].includes(value);
        },
        message: (props) => `${props.value} is not a valid user type!`,
      },
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UserSchema);
module.exports = { Users };
