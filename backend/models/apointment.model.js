const mongoose = require("mongoose");

const ApointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    description: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 100,
    },
    status: {
      type: String,
      required: true,
      default: "PENDING",
      enum: ["PENDING", "APPROVED", "DONE"],
    },
    assignedTo: {
      type: String,
      required: false,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicules",
      required: true,
    },
    belongsTo: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: false,
    },
    remarks: {
      type: [String],
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Apointments = mongoose.model("Apointments", ApointmentSchema);
module.exports = { Apointments };
