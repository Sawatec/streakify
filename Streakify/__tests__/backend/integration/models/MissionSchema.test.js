const Habit = require("../../../../backend/models/HabitModel");
const Mission = require("../../../../backend/models/MissionSchema");


// Test für das Erstellen einer neuen Mission
test("Neue Mission erstellen", async () => {
  // Habit erstellen
  const habit = new Habit({
    name: "Schwimmen",    // Erforderliches Feld
    uhrZeit: new Date(),  // Erforderliches Feld
  });
  const savedHabit = await habit.save();  // Habit speichern

  // Mission erstellen, die auf das Habit verweist
  const mission = new Mission({
    missionTitle: "Test Mission",
    description: "Testbeschreibung",
    linkedHabits: [savedHabit._id],  // Habit als Referenz
    xp: 100,
    status: "Offen",
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 3600000), // Endzeit nach 1 Stunde
  });

  const savedMission = await mission.save();  // Mission speichern

  // Überprüfen, ob die Mission gespeichert wurde und die Referenz zum Habit korrekt ist
  expect(savedMission).toBeDefined();
  expect(savedMission.missionTitle).toBe("Test Mission");
  expect(savedMission.linkedHabits[0].toString()).toBe(savedHabit._id.toString());
  expect(savedMission.xp).toBe(100);
  expect(savedMission.status).toBe("Offen");
  expect(savedMission.startTime).toBeDefined();
  expect(savedMission.endTime).toBeDefined();
});

// Test für die Validierung, dass Endzeit nach Startzeit liegt
test("Endzeit muss nach Startzeit liegen", async () => {
  const habit = new Habit({
    name: "Laufen",
    uhrZeit: new Date(),
  });
  const savedHabit = await habit.save();

  // Mission erstellen mit Start- und Endzeit, bei der Endzeit vor der Startzeit liegt
  const mission = new Mission({
    missionTitle: "Ungültige Mission",
    description: "Test für ungültige Endzeit",
    linkedHabits: [savedHabit._id],
    xp: 50,
    status: "Offen",
    startTime: new Date(),
    endTime: new Date(new Date().getTime() - 3600000), // Endzeit vor Startzeit
  });

  let error;
  try {
    await mission.save();  // Sollte fehlschlagen
  } catch (err) {
    error = err;
  }
  expect(error).toBeDefined();
  expect(error.message).toContain("Endzeitpunkt muss nach dem Startzeitpunkt liegen");
});

// Test für die Validierung der XP, dass sie nicht negativ sein darf
test("XP darf nicht negativ sein", async () => {
  const habit = new Habit({
    name: "Radfahren",
    uhrZeit: new Date(),
  });
  const savedHabit = await habit.save();

  // Mission mit negativem XP-Wert erstellen
  const mission = new Mission({
    missionTitle: "Mission mit negativem XP",
    description: "Test für negative XP",
    linkedHabits: [savedHabit._id],
    xp: -10,  // Ungültiger XP-Wert
    status: "Offen",
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 3600000),
  });

  let error;
  try {
    await mission.save();  // Sollte fehlschlagen
  } catch (err) {
    error = err;
  }
  expect(error).toBeDefined();
  expect(error.message).toContain("XP muss eine nicht-negative Zahl sein");
});

// Test für das Aktualisieren einer Mission
test("Mission aktualisieren", async () => {
  const habit = new Habit({
    name: "Joggen",
    uhrZeit: new Date(),
  });
  const savedHabit = await habit.save();

  const mission = new Mission({
    missionTitle: "Alte Mission",
    description: "Testbeschreibung",
    linkedHabits: [savedHabit._id],
    xp: 50,
    status: "Offen",
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 3600000),
  });
  const savedMission = await mission.save();

  // Mission aktualisieren
  savedMission.missionTitle = "Aktualisierte Mission";
  savedMission.xp = 75;
  const updatedMission = await savedMission.save();

  // Überprüfen, ob die Aktualisierung erfolgreich war
  expect(updatedMission.missionTitle).toBe("Aktualisierte Mission");
  expect(updatedMission.xp).toBe(75);
});

// Test für das Finden einer Mission
test("Mission finden", async () => {
  const habit = new Habit({
    name: "Schwimmen",
    uhrZeit: new Date(),
  });
  const savedHabit = await habit.save();

  const mission = new Mission({
    missionTitle: "Test Mission für Finden",
    description: "Testbeschreibung",
    linkedHabits: [savedHabit._id],
    xp: 100,
    status: "Offen",
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 3600000),
  });
  const savedMission = await mission.save();

  // Mission finden und überprüfen
  const foundMission = await Mission.findById(savedMission._id);
  expect(foundMission).toBeDefined();
  expect(foundMission.missionTitle).toBe("Test Mission für Finden");
});
