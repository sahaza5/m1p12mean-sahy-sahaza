const mongoose = require("mongoose");

const RepairSchema = new mongoose.Schema(
  {
    apointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apointments",
      required: "true",
      // type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["CHECKING", "REPAIRING", "DONE", "PAID"],
      default: "CHECKING",
    },
    // assignedTo: {
    //   type: String,
    //   required: true,
    // },
    amount: {
      type: Number,
      required: false,
    },
    service: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Repairs = mongoose.model("Repairs", RepairSchema);

module.exports = { Repairs };
