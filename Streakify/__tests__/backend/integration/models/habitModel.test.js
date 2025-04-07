/*
 * Erstellt bei: Mahdi Amouri (940504)
 * Datum: 20.11.2024
 * Dieses Skript testet die Funktionalität des Habit-Modells.
 */

const mongoose = require("mongoose");
const Habit = require("../../../../backend/models/HabitModel");
const Id = new mongoose.Types.ObjectId();

// Create a new Habit
test("New user", async () => {
  const currentDate = new Date();
  const newHabit = new Habit({
    Id: Id,
    uhrZeit: currentDate,
    name: "Schwimmen",
  });
  const res = await newHabit.save();
  expect(res).toBeDefined();
  expect(res.Id).toBe(Id);
  expect(res.uhrZeit.toISOString()).toBe(currentDate.toISOString());
  expect(res.name).toBe("Schwimmen");
});

// Update and findOne
/*
test("updateOne and findOne", async () => {
  const currentDate = new Date();
  const newHabit = new Habit({
    userID: userID,
    uhrZeit: currentDate,
    name: "Tennis spielen",
  });
  const res = await newHabit.save();

  // receiver is Model, i.e. we use a query
  const u1 = await Habit.updateOne(
    { userID: userID },
    { name: "Fußball spielen" }
  ).exec();
  expect(u1.matchedCount).toBe(1);
  expect(u1.modifiedCount).toBe(1);
  expect(u1.acknowledged).toBeTruthy();
  
  const u2 = await Habit.findOne({
    userID: userID,
  }).exec();
  if (u2) {
    throw new Error(
      "Habit nach Update gefunden, obwohl userID verändert wurde"
    );
  }

  const u3 = await Habit.findOne({ userID: userID });
  if (!u3) {
    throw new Error("Habit nach Update unter neuer userID nicht gefunden");
  }

  expect(u3.habit).toBe("Fußball spielen");
});
*/
