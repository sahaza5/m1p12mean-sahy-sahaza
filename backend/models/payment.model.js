const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    repair: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repairs",
    },
    status: {
      type: String,
      enum: ["UNPAID", "PAID"],
      default: "UNPAID",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Payments = mongoose.model("Payments", PaymentSchema);

module.exports = { Payments };
