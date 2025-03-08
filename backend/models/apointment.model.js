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
      enum: ["PENDING", "PROGRESS", "DONE", "PAID"],
    },
    assignedTo: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    remarks: {
      type: [String],
      required: false,
    },
    location: {
      type: String,
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
