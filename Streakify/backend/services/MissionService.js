const Mission = require("../models/MissionModel");  // Importiere das Mission-Modell

const MissionService = {};

/**
 * Findet eine Mission anhand der Missionsnummer.
 * @param {number} nummer - Die Missionsnummer.
 * @returns {Promise<Object>} - Die gefundene Mission oder null, wenn sie nicht existiert.
 */
MissionService.getMissionByNummer = async (nummer) => {
  try {
    const mission = await Mission.findOne({ nummer });
    if (!mission) {
      throw new Error("Mission nicht gefunden.");
    }
    return mission;
  } catch (error) {
    throw new Error("Fehler beim Abrufen der Mission: " + error.message);
  }
};

/**
 * Erstellt eine neue Mission.
 * @param {Object} missionData - Die Daten für die neue Mission.
 * @returns {Promise<Object>} - Die erstellte Mission.
 */
MissionService.createMission = async (missionData) => {
  try {
    const mission = new Mission(missionData);
    console.log(missionData)
    await mission.save();
    return mission;
  } catch (error) {
    throw new Error("Fehler beim Erstellen der Mission: " + error.message);
  }
};

/**
 * Löscht eine Mission anhand ihrer ID.
 * @param {string} missionId - Die ID der Mission.
 * @returns {Promise<Object>} - Die gelöschte Mission.
 */
MissionService.deleteMission = async (missionId) => {
  try {
    const deletedMission = await Mission.findByIdAndDelete(missionId);
    if (!deletedMission) {
      throw new Error("Mission nicht gefunden.");
    }
    return deletedMission;
  } catch (error) {
    throw new Error("Fehler beim Löschen der Mission: " + error.message);
  }
};

/**
 * Aktualisiert eine Mission anhand ihrer ID.
 * @param {string} missionId - Die ID der Mission.
 * @param {Object} updateData - Die neuen Daten für die Mission.
 * @returns {Promise<Object>} - Die aktualisierte Mission.
 */
MissionService.updateMission = async (missionId, updateData) => {
  try {
    const updatedMission = await Mission.findByIdAndUpdate(
      missionId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedMission) {
      throw new Error("Mission nicht gefunden.");
    }
    return updatedMission;
  } catch (error) {
    throw new Error("Fehler beim Aktualisieren der Mission: " + error.message);
  }
};

module.exports = MissionService;
