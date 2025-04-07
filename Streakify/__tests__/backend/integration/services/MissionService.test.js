const Mission = require("../../../../backend/models/MissionSchema");
const {
  getAllMissions,
  getMissionByTitle,
  createMission,
  updateMissionByTitle,
  deleteMissionByTitle,
} = require("../../../../backend/services/MissionService");

jest.mock("../../../../backend/models/MissionSchema");

describe("Mission Service Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for getAllMissions
  test("should retrieve all missions", async () => {
    const mockMissions = [
      { missionTitle: "Test Mission 1", xp: 10 },
      { missionTitle: "Test Mission 2", xp: 20 },
    ];

    Mission.find.mockResolvedValue(mockMissions);

    const result = await getAllMissions();

    expect(Mission.find).toHaveBeenCalled();
    expect(result).toEqual(mockMissions);
  });

  // Test for getMissionByTitle
  test("should retrieve a mission by title", async () => {
    const mockMission = { missionTitle: "Test Mission", xp: 50 };
    Mission.findOne.mockResolvedValue(mockMission);

    const result = await getMissionByTitle("Test Mission");

    expect(Mission.findOne).toHaveBeenCalledWith({ title: "Test Mission" });
    expect(result).toEqual(mockMission);
  });

  test("should throw error if mission not found by title", async () => {
    Mission.findOne.mockResolvedValue(null);

    await expect(getMissionByTitle("Nonexistent Mission")).rejects.toThrow("Mission not found");
    expect(Mission.findOne).toHaveBeenCalledWith({ title: "Nonexistent Mission" });
  });

  // Test for createMission
  test("should create a new mission", async () => {
    const mockMissionContent = { missionTitle: "New Mission", xp: 100 };
    const mockCreatedMission = { ...mockMissionContent, _id: "mockedId" };

    Mission.create.mockResolvedValue(mockCreatedMission);

    const result = await createMission(mockMissionContent);

    expect(Mission.create).toHaveBeenCalledWith(mockMissionContent);
    expect(result).toEqual(mockCreatedMission);
  });

  test("should throw error if mission creation fails", async () => {
    Mission.create.mockRejectedValue(new Error("Database error"));

    await expect(createMission({ missionTitle: "Fail Mission" })).rejects.toThrow(
      "Failed to create mission"
    );
    expect(Mission.create).toHaveBeenCalled();
  });

  // Test for updateMissionByTitle
  test("should update a mission by title", async () => {
    const mockMissionContent = { xp: 200 };
    const mockUpdatedMission = { missionTitle: "Updated Mission", xp: 200 };

    Mission.findOneAndUpdate.mockResolvedValue(mockUpdatedMission);

    const result = await updateMissionByTitle("Updated Mission", mockMissionContent);

    expect(Mission.findOneAndUpdate).toHaveBeenCalledWith(
      { title: "Updated Mission" },
      mockMissionContent,
      { new: true }
    );
    expect(result).toEqual(mockUpdatedMission);
  });

  test("should throw error if mission to update is not found", async () => {
    Mission.findOneAndUpdate.mockResolvedValue(null);

    await expect(updateMissionByTitle("Nonexistent Mission", {})).rejects.toThrow("Mission not found");
    expect(Mission.findOneAndUpdate).toHaveBeenCalled();
  });

  // Test for deleteMissionByTitle
  test("should delete a mission by title", async () => {
    const mockDeletedMission = { missionTitle: "Deleted Mission", xp: 0 };

    Mission.findOneAndDelete.mockResolvedValue(mockDeletedMission);

    const result = await deleteMissionByTitle("Deleted Mission");

    expect(Mission.findOneAndDelete).toHaveBeenCalledWith({ title: "Deleted Mission" });
    expect(result).toEqual(mockDeletedMission);
  });

  test("should throw error if mission to delete is not found", async () => {
    Mission.findOneAndDelete.mockResolvedValue(null);

    await expect(deleteMissionByTitle("Nonexistent Mission")).rejects.toThrow("Mission not found");
    expect(Mission.findOneAndDelete).toHaveBeenCalled();
  });
});
