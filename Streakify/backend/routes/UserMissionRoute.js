const express = require("express");
const router = express.Router();
const {
  checkProgress,
  createUserMission,
  getUserMissions,
  deleteUserMission,
} = require("../services/UserMissionService");

// Benutzer-Mission erstellen
router.post("/", async (req, res) => {
  try {
    const { userId, missionId } = req.body;
    const result = await createUserMission(userId, missionId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Benutzer-Missionen abrufen
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId ist erforderlich." });
    }
    const result = await getUserMissions(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Fortschritt prüfen und aktualisieren
router.put("/check-progress", async (req, res) => {
  try {
    const { userId, missionType, progressIncrement, actionType } = req.body;

    if (!userId || !missionType || !actionType) {
      return res.status(400).json({ success: false, message: "userId, missionType und actionType sind erforderlich." });
    }

    const result = await checkProgress(userId, missionType, progressIncrement || 1, actionType);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Benutzer-Mission löschen
router.delete("/:userMissionId", async (req, res) => {
  try {
    const { userMissionId } = req.params;
    const result = await deleteUserMission(userMissionId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
