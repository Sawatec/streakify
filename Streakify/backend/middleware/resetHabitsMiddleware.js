const Habit = require("../models/HabitModel");
const User = require("../models/UserModel");

async function resetHabitsIfNewDay(req, res, next) {
  try {
    const userId = req.user.id;
    const currentDate = new Date().toISOString().split("T")[0];

    const user = await User.findById(userId).populate("habits");
    if (!user) {
      return res.status(404).json({ error: "Benutzer nicht gefunden." });
    }

    const lastLoginDate = user.lastLogin
      ? user.lastLogin.toISOString().split("T")[0]
      : null;

    if (!lastLoginDate || lastLoginDate !== currentDate) {
      const habits = user.habits;

      let allHabitsCompletedYesterday = true;

      for (const habit of habits) {
        const completionHistory = habit.completionHistory || [];
        const lastCompletion = completionHistory.length > 0
          ? completionHistory[completionHistory.length - 1]
          : null;
        const lastCompletionDate = lastCompletion
          ? new Date(lastCompletion.completedAt).toISOString().split("T")[0]
          : null;

        if (lastCompletionDate !== lastLoginDate) {
          allHabitsCompletedYesterday = false;
        }

        const diffInDays = lastCompletionDate
          ? Math.floor(
              (new Date(currentDate) - new Date(lastCompletionDate)) /
              (1000 * 60 * 60 * 24)
            )
          : Infinity;

        if (diffInDays > 1) {
          habit.streak = 0; 
        }

        habit.fulfilled = false; 
        await habit.save();
      }

      user.streak = allHabitsCompletedYesterday ? user.streak + 1 : 0; 
      user.lastLogin = new Date();
      await user.save();

      console.log(`Habits und Streaks für Benutzer ${userId} aktualisiert.`);
    }

    next();
  } catch (error) {
    console.error("Fehler beim Zurücksetzen der Habits und Streaks:", error);
    res.status(500).json({ error: "Fehler beim Zurücksetzen der Habits und Streaks." });
  }
}

module.exports = resetHabitsIfNewDay;
