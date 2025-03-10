const mongoose = require("mongoose");

const VehiculeSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    name: { type: String },
    model: { type: String },
    licensePlate: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const Vehicules = mongoose.model("Vehicules", VehiculeSchema);
module.exports = { Vehicules };
