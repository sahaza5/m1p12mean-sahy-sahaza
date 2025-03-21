const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
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
      enum: ["CREER", "EN ATTENTE", "EN COURS", "TERMINER"],
      default: "CREER",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", TaskSchema);

module.exports = { Tasks };
