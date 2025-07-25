// routes/ownerRoutes.js
const express = require("express");
const router = express.Router();
const Owner = require("../models/Owner");

// GET all owners
router.get("/", async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add owner
router.post("/", async (req, res) => {
  try {
    const owner = new Owner(req.body);
    await owner.save();
    res.json(owner);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating owner", error: err.message });
  }
});

// Update owner
router.put("/:id", async (req, res) => {
  try {
    const updated = await Owner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating owner", error: err.message });
  }
});

// Delete owner
router.delete("/:id", async (req, res) => {
  try {
    const deletedOwner = await Owner.findByIdAndDelete(req.params.id);
    if (!deletedOwner)
      return res.status(404).json({ message: "Owner not found" });
    res.json({ message: "Owner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting owner", error });
  }
});

// Add ledger entry
router.post("/:id/ledger", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, description } = req.body;

    if (amount === undefined || !date || !description) {
      return res
        .status(400)
        .json({ message: "Amount, date, and description are required" });
    }

    const owner = await Owner.findById(id);
    if (!owner) return res.status(404).json({ message: "Owner not found" });

    owner.ledger.push({ amount, date, description });
    await owner.save();

    res.status(200).json(owner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
