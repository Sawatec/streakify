const HabitService = require("../../../../backend/services/HabitService");
const Habit = require("../../../../backend/models/HabitModel");
const mongoose = require("mongoose");

jest.mock("../../../../backend/models/HabitModel");

describe("HabitService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllHabits", () => {
        it("should return all habits", async () => {
            const mockHabits = [{ name: "habit1" }, { name: "habit2" }];
            Habit.find.mockResolvedValue(mockHabits);

            const habits = await HabitService.getAllHabits();

            expect(habits).toEqual(mockHabits);
            expect(Habit.find).toHaveBeenCalledTimes(1);
        });

        it("should return null if an error occurs", async () => {
            Habit.find.mockRejectedValue(new Error("Database error"));

            const habits = await HabitService.getAllHabits();

            expect(habits).toBeNull();
            expect(Habit.find).toHaveBeenCalledTimes(1);
        });
    });

    describe("getHabitById", () => {
        it("should return the habit by Id", async () => {
            const mockHabit = { name: "habit1" };
            Habit.findOne.mockResolvedValue(mockHabit);

            const habit = await HabitService.getHabitById("123");

            expect(habit).toEqual(mockHabit);
            expect(Habit.findOne).toHaveBeenCalledWith({ Id: "123" });
        });

        it("should throw an error if habit not found", async () => {
            Habit.findOne.mockRejectedValue(new Error("Habit not found"));

            await expect(HabitService.getHabitById("123")).rejects.toThrow("Habit not found");
            expect(Habit.findOne).toHaveBeenCalledWith({ Id: "123" });
        });
    });

    describe("createHabit", () => {
        it("should create a new habit", async () => {
            const mockHabit = { name: "new habit" };
            Habit.create.mockResolvedValue(mockHabit);

            const newHabit = await HabitService.createHabit(mockHabit);

            expect(newHabit).toEqual(mockHabit);
            expect(Habit.create).toHaveBeenCalledWith(mockHabit);
        });

        it("should return null if an error occurs", async () => {
            Habit.create.mockRejectedValue(new Error("Database error"));

            const newHabit = await HabitService.createHabit({ name: "new habit" });

            expect(newHabit).toBeNull();
            expect(Habit.create).toHaveBeenCalledTimes(1);
        });
    });

    describe("updateHabitById", () => {
        it("should update the habit by Id", async () => {
            const mockHabit = { name: "updated habit" };
            Habit.findOneAndUpdate.mockResolvedValue(mockHabit);

            const updatedHabit = await HabitService.updateHabitById("123", mockHabit);

            expect(updatedHabit).toEqual(mockHabit);
            expect(Habit.findOneAndUpdate).toHaveBeenCalledWith(
                { Id: "123" },
                mockHabit,
                { new: true }
            );
        });

        it("should return null if habit not found", async () => {
            Habit.findOneAndUpdate.mockResolvedValue(null);

            const updatedHabit = await HabitService.updateHabitById("123", { name: "updated habit" });

            expect(updatedHabit).toBeNull();
            expect(Habit.findOneAndUpdate).toHaveBeenCalledWith(
                { Id: "123" },
                { name: "updated habit" },
                { new: true }
            );
        });

        it("should return null if an error occurs", async () => {
            Habit.findOneAndUpdate.mockRejectedValue(new Error("Database error"));

            const updatedHabit = await HabitService.updateHabitById("123", { name: "updated habit" });

            expect(updatedHabit).toBeNull();
            expect(Habit.findOneAndUpdate).toHaveBeenCalledTimes(1);
        });
    });

    describe("deleteUserById", () => {
        it("should delete the habit by Id", async () => {
            const mockHabit = { name: "deleted habit" };
            Habit.findOneAndDelete.mockResolvedValue(mockHabit);

            const deletedHabit = await HabitService.deleteUserById("123");

            expect(deletedHabit).toEqual(mockHabit);
            expect(Habit.findOneAndDelete).toHaveBeenCalledWith({ Id: "123" });
        });

        it("should return null if habit not found", async () => {
            Habit.findOneAndDelete.mockResolvedValue(null);

            const deletedHabit = await HabitService.deleteUserById("123");

            expect(deletedHabit).toBeNull();
            expect(Habit.findOneAndDelete).toHaveBeenCalledWith({ Id: "123" });
        });

        it("should return null if an error occurs", async () => {
            Habit.findOneAndDelete.mockRejectedValue(new Error("Database error"));

            const deletedHabit = await HabitService.deleteUserById("123");

            expect(deletedHabit).toBeNull();
            expect(Habit.findOneAndDelete).toHaveBeenCalledTimes(1);
        });
    });
});

