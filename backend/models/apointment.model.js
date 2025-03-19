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
      // enum: ["PENDING", "APPROVED", "DONE"],
      enum: ["PENDING", "APPROVED", "DONE", "CANCELED"],
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
    carName: {
      type: String,
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
    // remarks: {
    //   type: String,
    //   required: false,
    // },
    // image: {
    //   type: String,
    //   required: false,
    // },
  },
  { timestamps: true }
);

const Apointments = mongoose.model("Apointments", ApointmentSchema);
module.exports = { Apointments };
