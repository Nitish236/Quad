const mongoose = require("mongoose");

// Coin Schema

const coinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Coin name is required"],
    },
    last: {
      type: Number,
      required: [true, `Coin's last trade value is needed`],
    },
    buy: {
      type: Number,
      required: [true, `Coin's current buy value is needed`],
    },
    sell: {
      type: Number,
      required: [true, `Coin's current sell value is needed`],
    },
    volume: {
      type: Number,
      required: [true, `Coin's volume is needed`],
    },
    base_unit: {
      type: String,
      required: [true, `Coin's base unit is needed`],
    },
  },
  { timestamps: true }
);

// Coin Model

module.exports = mongoose.model("Coin", coinSchema);
