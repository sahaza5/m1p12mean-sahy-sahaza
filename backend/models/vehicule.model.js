const mongoose = require("mongoose");

const VehiculeSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    name: { type: String, required: true },
    description: { type: String, required: true },

    image: { type: String },
  },
  { timestamps: true }
);

const Vehicules = mongoose.model("Vehicules", VehiculeSchema);
module.exports = { Vehicules };
