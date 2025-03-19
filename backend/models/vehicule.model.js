const mongoose = require("mongoose");

const VehiculeSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    name: { type: String, required: true },
    model: { type: String, required: true },
    repairStatus: {
      type: String,
      enum: [
        "",
        "WAITING APOINTMENT",
        "REPAIRING",
        "REPAIRED",
        "CANCELED APOINTMENT",
      ],
      default: "",
    },
    licensePlate: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const Vehicules = mongoose.model("Vehicules", VehiculeSchema);
module.exports = { Vehicules };
