const { log } = require("console");
const Habit = require("../models/HabitModel");
const User = require('../models/UserModel');
const { checkProgress } = require("../services/UserMissionService");

// Alle Habits für einen Benutzer abrufen
async function getHabitsByUserId(userId) {
    try {
        const habits = await Habit.find({ user: userId });
        console.log("Habits for user:", userId, habits);
        return habits;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
}

// Ein Habit abrufen
async function getHabitById(id) {
    try {
        const habit = await Habit.findById(id);
        return habit;
    } catch (error) {
        console.error("Error finding Habit by Id: ", error);
        throw error;
    }
}

// Ein Habit erstellen
async function createHabit(habitContent) {
    try {
        const {baseXP, durationXP} = calculateBaseXP(habitContent.category, habitContent.duration); // XP basierend auf Kategorie und Dauer berechnen
        console.log("Base XP:", baseXP, "Duration XP:", durationXP);
        habitContent.xp = baseXP + durationXP; // Gesamte XP für den Habit
        console.log("Creating Habit with xp:", habitContent.xp);
        const newHabit = await Habit.create(habitContent);

        await User.findByIdAndUpdate(
            habitContent.user,
            { $push: { habits: newHabit._id } },
            { new: true }
        );

        console.log("Habit created and added to user:", newHabit);

        // Fortschritt für Habit-Missionen prüfen
        const missionResult = await checkProgress(habitContent.user, "habit", 1, "create");

        return { newHabit, missionResult };
    } catch (err) {
        console.log(`Error: ${err}`);
        throw new Error("Fehler beim Erstellen des Habits.");
    }
}

// Ein Habit aktualisieren
async function updateHabitById(id, habitContent) {
    try {
        console.log("---------------Updating Habit with id:", id);
        const updatedHabit = await Habit.findByIdAndUpdate(id, habitContent, { new: true });
        console.log("---------------Updated Habit:", updatedHabit);
        if (!updatedHabit) {
            console.log("Habit not found");
            return null;
        }

        console.log("Habit updated:", updatedHabit);

        // Fortschritt für Habit-Missionen prüfen
        const missionResult = await checkProgress(updatedHabit.user, "habit", 1, "update");

        return { updatedHabit, missionResult };
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
}

// Ein Habit abschließen
async function completeHabit(habitId, userId) {
    try {
        const currentDate = new Date();
        const habit = await Habit.findById(habitId);
        if (!habit) throw new Error("Habit not found");

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const lastCompletionDate = habit.completionHistory.length
            ? new Date(habit.completionHistory[habit.completionHistory.length - 1].completedAt).toISOString().split("T")[0]
            : null;
        const currentDateStr = currentDate.toISOString().split("T")[0];

        if (lastCompletionDate !== currentDateStr) {
            habit.streak += 1;
            habit.fulfilled = true;

            // Berechnung der vollständigen XP inklusive Boni
            const { baseXP, durationXP, habitStreakBonus, personalStreakBonus, totalXP } = calculateTotalXP(habit.category, habit.duration, habit.streak, user.streak);
            console.log("Base XP:", baseXP, "Duration XP:", durationXP, "Habit streak bonus:", habitStreakBonus, "Personal streak bonus:", personalStreakBonus);
            console.log("XP earned:", totalXP);
            habit.completionHistory.push({ completedAt: currentDate, xpEarned: totalXP });
            await habit.save();

            // Überprüfen, ob die User-Streak heute schon erhöht wurde
            const lastUserStreakDate = user.lastStreakDate ? new Date(user.lastStreakDate).toISOString().split("T")[0] : null;
            console.log("Last user streak date:", lastUserStreakDate);
            if (lastUserStreakDate !== currentDateStr) {
                user.streak += 1;
                user.lastStreakDate = currentDate;
            }

            user.xp += totalXP;

            // Überprüfen, ob der Benutzer ein Level-Up erreicht hat
            const xpForNextLevel = calculateXPForNextLevel(user.level);
            if (user.xp >= xpForNextLevel) {
                user.level += 1;
                user.xp -= xpForNextLevel; // Rest-XP für das nächste Level
            }

            await user.save();

            // Fortschritt für Habit-Missionen prüfen
            const missionResult = await checkProgress(habit.user, "habit", 1, "update");

            return { habit, user, missionResult, xp: user.xp, level: user.level, streak: user.streak, baseXP, durationXP, habitStreakBonus, personalStreakBonus, totalXP };
        }

        return habit;
    } catch (err) {
        console.error("Error completing habit:", err);
        throw err;
    }
}

// Ein Habit löschen
async function deleteHabitById(id) {
    try {
        const deletedHabit = await Habit.findByIdAndDelete(id);
        if (!deletedHabit) {
            throw new Error("Habit not found");
        }

        await User.findByIdAndUpdate(deletedHabit.user, { $pull: { habits: id } });

        console.log("Habit deleted and removed from user:", deletedHabit);

        // Fortschritt für Habit-Missionen prüfen
        const missionResult = await checkProgress(deletedHabit.user, "habit", 1, "delete");

        return { deletedHabit, missionResult };
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
}

// Funktion zur Berechnung der Basis-XP
function calculateBaseXP(category, duration) {
    const categoryXPMap = {
        Fitness: 100,
        Achtsamkeit: 80,
        Bildung: 70,
        Einkaufen: 50,
        Freunde: 60,
        Gesundheit: 90,
        Arbeit: 80,
        Hobbys: 60,
        Soziales: 70,
        Selbstfürsorge: 80,
        Übung: 90,
        Lernen: 70,
        Finanzen: 60,
        Produktivität: 80,
        Umwelt: 70,
    };

    const baseXP = Number(categoryXPMap[category]) || 5; // Standardwert, falls Kategorie nicht gefunden wird
    const durationXP = Number(duration); // 1 XP pro Minute der Dauer

    return { baseXP, durationXP };
}

// Funktion zur Berechnung der vollständigen XP inklusive Boni
function calculateTotalXP(category, duration, habitStreak, personalStreak) {
    const { baseXP, durationXP } = calculateBaseXP(category, duration);
    const habitStreakBonus = baseXP * 0.05 * habitStreak; // 5% der Basis-XP multipliziert mit der Habit-Streak
    const personalStreakBonus = baseXP * 0.03 * personalStreak; // 3% der Basis-XP multipliziert mit der persönlichen Streak

    const totalXP = baseXP + durationXP + habitStreakBonus + personalStreakBonus;
    return { baseXP, durationXP, habitStreakBonus, personalStreakBonus, totalXP };
}

function calculateXPForNextLevel(level) {
    return Math.round(1000 * Math.pow(1.2, level - 1)); // 1000 XP für Level 1, 1200 XP für Level 2, 1440 XP für Level 3, usw.
}

module.exports = {
    getHabitsByUserId,
    getHabitById,
    createHabit,
    updateHabitById,
    completeHabit,
    deleteHabitById,
};
