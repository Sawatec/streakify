const express = require("express");
const MissionService = require("../services/MissionService.js");

const router = express.Router();

// Route zum Erstellen einer neuen Mission
router.post("/", async (req, res) => {
  try {
    const mission = await MissionService.createMission(req.body);
    res.status(201).json(mission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route zum Löschen einer Mission nach ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMission = await MissionService.deleteMission(req.params.id);
    res.status(200).json(deletedMission);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route zum Aktualisieren einer Mission nach ID
router.put("/:id", async (req, res) => {
  try {
    const updatedMission = await MissionService.updateMission(req.params.id, req.body);
    res.status(200).json(updatedMission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route zum Abrufen einer Mission nach Nummer
router.get("/nummer/:nummer", async (req, res) => {
  try {
    const mission = await MissionService.getMissionByNummer(req.params.nummer);
    res.status(200).json(mission);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
