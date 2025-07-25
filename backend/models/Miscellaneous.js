// models/MiscExpense.js
const mongoose = require("mongoose");

const miscExpenseSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MiscExpense", miscExpenseSchema);
