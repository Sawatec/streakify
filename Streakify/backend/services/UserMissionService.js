const MissionUser = require('../models/UserMissionModel');  // Pfad anpassen, wenn nötig
const MissionService = require("../services/MissionService");
const MissionUserService = {};
/**
 * Findet eine MissionUser anhand der Missionnummer und der UserID.
 * Falls keine MissionUser gefunden wird, initialisiert die ersten 3 Missionen für den Benutzer.
 * @param {string} userId - Die UserID des Benutzers.
 * @param {number} nummer - Die Missionsnummer.
 * @returns {Promise<Object>} - Der gefundene MissionUser oder ein neuer MissionUser, wenn keine gefunden wurde.
 */
MissionUserService.getMissionUser = async (userId, nummer) => {
  try {
    // Suche nach der MissionUser-Instanz
    let missionUser = await MissionUser.findOne({
      userId: userId,
      nummer: nummer,
    });

    // Wenn keine MissionUser für diesen Benutzer und die Mission existiert, initialisiere die Missionen
    if (!missionUser) {
      console.log(`Keine Mission für Benutzer mit ID ${userId} und Nummer ${nummer} gefunden. Initialisiere Missionen.`);
      // Initialisiere die ersten 3 Missionen für den Benutzer
      await MissionUserService.initializeUserMissions(userId);
      // Hole die Mission erneut nach der Initialisierung
      missionUser = await MissionUser.findOne({
        userId: userId,
        nummer: nummer,
      });

      // Wenn auch nach der Initialisierung keine MissionUser gefunden wurde, werfe einen Fehler
      if (!missionUser) {
        throw new Error("Mission konnte nach der Initialisierung immer noch nicht gefunden werden.");
      }
    }

    return missionUser;
  } catch (error) {
    throw new Error("Fehler beim Abrufen der Mission: " + error.message);
  }
};

/**
 * Initialisiert die ersten drei Missionen für einen Benutzer.
 * @param {string} userId - Die ID des aktuellen Benutzers.
 * @returns {Promise<Object[]>} - Ein Array mit den erstellten MissionUser-Objekten.
 */
MissionUserService.initializeUserMissions = async (userId) => {
  try {
    // Hole die Missionen 1 bis 3 vom MissionService
    const missions = await Promise.all([
      MissionService.getMissionByNummer(1),
      MissionService.getMissionByNummer(2),
      MissionService.getMissionByNummer(3)
    ]);

    // Mappe die Missionen und erstelle MissionUser-Objekte
    const missionUserPromises = missions.map(async (mission) => {
      const missionUser = new MissionUser({
        userId: userId,
        nummer: mission.nummer,
        type: mission.type,
        action: mission.action,
        amount: mission.amount,
        reward: mission.reward,
        currentStatus: 0, // Setzt den Status auf 0 (Noch nicht begonnen)
        finished: false   // Setzt den Status auf false (Noch nicht abgeschlossen)
      });

      // Speichern der MissionUser-Instanz in der Datenbank
      return await missionUser.save();
    });

    // Warten auf das Speichern aller MissionUser-Objekte
    const createdMissionUsers = await Promise.all(missionUserPromises);
    return createdMissionUsers;

  } catch (error) {
    throw new Error("Fehler beim Initialisieren der User-Missionen: " + error.message);
  }
};


/**
 * Erstellt eine neue MissionUser.
 * @param {Object} missionUserData - Die Daten für die neue MissionUser.
 * @returns {Promise<Object>} - Die erstellte MissionUser.
 */
MissionUserService.createMissionUser = async (missionUserData) => {
  try {
    const missionUser = new MissionUser(missionUserData);
    await missionUser.save();
    return missionUser;
  } catch (error) {
    throw new Error("Fehler beim Erstellen der Mission: " + error.message);
  }
};

/**
 * Löscht eine MissionUser anhand ihrer ID.
 * @param {string} missionUserId - Die ID des MissionUser.
 * @returns {Promise<Object>} - Der gelöschte MissionUser.
 */
MissionUserService.deleteMissionUser = async (missionUserId) => {
  try {
    const deletedMissionUser = await MissionUser.findByIdAndDelete(missionUserId);
    if (!deletedMissionUser) {
      throw new Error("MissionUser nicht gefunden.");
    }
    return deletedMissionUser;
  } catch (error) {
    throw new Error("Fehler beim Löschen der MissionUser: " + error.message);
  }
};

/**
 * Aktualisiert eine MissionUser anhand ihrer ID.
 * @param {string} missionUserId - Die ID des MissionUser.
 * @param {Object} updateData - Die neuen Daten für die MissionUser.
 * @returns {Promise<Object>} - Die aktualisierte MissionUser.
 */
MissionUserService.updateMissionUser = async (missionUserId, updateData) => {
  try {
    const updatedMissionUser = await MissionUser.findByIdAndUpdate(
      missionUserId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedMissionUser) {
      throw new Error("MissionUser nicht gefunden.");
    }
    return updatedMissionUser;
  } catch (error) {
    throw new Error("Fehler beim Aktualisieren der MissionUser: " + error.message);
  }
};

/**
 * Findet alle Missionen für einen bestimmten Benutzer.
 * Falls keine Missionen für den Benutzer gefunden werden, werden die ersten 3 Missionen für den Benutzer initialisiert.
 * @param {string} userId - Die UserID des Benutzers.
 * @returns {Promise<Array>} - Eine Liste der Missionen des Benutzers.
 */
MissionUserService.getAllMissionsForUser = async (userId) => {
  try {
    // Suche nach allen Missionen für den Benutzer
    let missions = await MissionUser.find({ userId });

    // Wenn keine Missionen für den Benutzer existieren, initialisiere die Missionen
    if (!missions.length) {
      console.log(`Keine Missionen für Benutzer mit ID ${userId} gefunden. Initialisiere Missionen.`);
      // Initialisiere die ersten 3 Missionen für den Benutzer
      await MissionUserService.initializeUserMissions(userId);
      // Hole alle Missionen erneut nach der Initialisierung
      missions = await MissionUser.find({ userId });

      // Wenn auch nach der Initialisierung keine Missionen gefunden wurden, werfe einen Fehler
      if (!missions.length) {
        throw new Error("Missionen konnten nach der Initialisierung immer noch nicht gefunden werden.");
      }
    }

    return missions;
  } catch (error) {
    throw new Error("Fehler beim Abrufen der Missionen: " + error.message);
  }
};

module.exports = MissionUserService;
