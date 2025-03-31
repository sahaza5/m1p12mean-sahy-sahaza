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
      validate: {
        validator: function (value) {
          return ["CREER", "EN ATTENT", "EN COURS", "TERMINER"].includes(value);
        },
        message: (props) => `${props.value} is not a valid status!`,
      },
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
