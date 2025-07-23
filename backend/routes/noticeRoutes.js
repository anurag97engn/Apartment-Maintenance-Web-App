const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

// Get all notices
router.get("/", async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.json(notices);
});

// Add notice
router.post("/", async (req, res) => {
  const notice = new Notice(req.body);
  await notice.save();
  res.json(notice);
});

// Update notice
router.put("/:id", async (req, res) => {
  const updated = await Notice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete notice
router.delete("/api/notices/:id", async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
