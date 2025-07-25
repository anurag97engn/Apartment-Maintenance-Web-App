// routes/miscExpenseRoutes.js
const express = require("express");
const router = express.Router();
const MiscExpense = require("../models/Miscellaneous");

router.post("/", async (req, res) => {
  try {
    const expense = new MiscExpense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (_req, res) => {
  const expenses = await MiscExpense.find().sort({ date: -1 });
  res.json(expenses);
});

module.exports = router;
