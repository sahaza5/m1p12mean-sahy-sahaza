const mongoose = require("mongoose");

const RepairSchema = new mongoose.Schema(
  {
    apointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apointments",
    },
    status: {
      type: String,
      enum: ["REPAIRING", "DONE"],
      default: "REPAIRING",
    },
    assignedTo: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repair", RepairSchema);
