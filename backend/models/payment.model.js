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

module.exports = mongoose.model("Payment", [PaymentSchema]);
