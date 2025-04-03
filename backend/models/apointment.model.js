const mongoose = require("mongoose");

const ApointmentSchema = new mongoose.Schema(
  {
    // title: {
    //   type: String,
    //   required: true,
    //   minlength: 3,
    //   maxlength: 20,
    // },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    status: {
      type: String,
      required: true,
      default: "PENDING",
      validate: {
        validator: function (value) {
          return ["PENDING", "APPROVED", "DONE", "CANCELED"].includes(value);
        },
        message: (props) =>
          `${props.value} is not a valid status! Valid values are PENDING, APPROVED, DONE, CANCELED.`,
      },
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Users",
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicules",
      required: true,
    },

    belongsTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    date: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const Apointments = mongoose.model("Apointments", ApointmentSchema);
module.exports = { Apointments };
