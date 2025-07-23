// models/Owner.js
const mongoose = require("mongoose");

const ledgerEntrySchema = new mongoose.Schema({
  amount: Number,
  date: { type: Date, default: Date.now },
  description: String,
});

const ownerSchema = new mongoose.Schema({
  flatNumber: String,
  ownerName: String,
  contact: String,
  ledger: [ledgerEntrySchema],
});

module.exports = mongoose.model("Owner", ownerSchema);
