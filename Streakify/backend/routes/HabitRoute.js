const express = require("express");
const { authMiddlewareToken } = require("../middleware/authMiddlewareToken");
const resetHabitsIfNewDay = require("../middleware/resetHabitsMiddleware"); 
const {
  getHabitsByUserId,
  getHabitById,
  createHabit,
  updateHabitById,
  deleteHabitById,
  completeHabit
} = require("../services/HabitService");

const habitRoute = express.Router();

habitRoute.use(authMiddlewareToken, resetHabitsIfNewDay); 

habitRoute.get("/", async (req, res) => {
  try {
    const habits = await getHabitsByUserId(req.user.id);
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

habitRoute.get("/:id", async (req, res) => {
  try {
    const habit = await getHabitById(req.params.id);
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

habitRoute.post("/", async (req, res) => {
  try {
    const newHabit = await createHabit({ ...req.body, user: req.user.id });
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

habitRoute.put("/:id", async (req, res) => {
  console.log("----------Updating Habit with id:");
  try {
    const updatedHabit = await updateHabitById(req.params.id, req.body);
    res.status(200).json(updatedHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

habitRoute.post("/:id/complete", async (req, res) => { // Ändern von PUT zu POST
  try {
    const completedHabit = await completeHabit(req.params.id, req.user.id);
    res.status(200).json(completedHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

habitRoute.delete("/:id", async (req, res) => {
  console.log("Deleting Habit with id:", req.params.id);  
  try {
    const deletedHabit = await deleteHabitById(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = habitRoute;
