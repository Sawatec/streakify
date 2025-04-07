import React, { useState, useEffect } from "react";
import Mission from "../Mission/mission"; // Importiere die Mission-Komponente

// Dummy-Daten für Missionen mit `type`-Property
const dummyMissions = [
  { id: "1", title: "Mission 1", description: "Complete 3 tasks this week", completed: false, progress: 20, type: "productivity" },
  { id: "2", title: "Mission 2", description: "Drink 2L of water daily", completed: true, progress: 100, type: "health" },
  { id: "3", title: "Mission 3", description: "Meditate for 10 minutes every day", completed: false, progress: 50, type: "health" },
  { id: "4", title: "Mission 4", description: "Run 5km", completed: false, progress: 70, type: "fitness" },
];

const MissionList: React.FC = () => {
  const [missions, setMissions] = useState(dummyMissions);

  // Funktion zum Abschließen einer Mission
  const handleCompleteMission = (missionId: string) => {
    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === missionId && !mission.completed
          ? { ...mission, completed: true, progress: 100 }
          : mission
      )
    );
  };

  useEffect(() => {
    // Hier könnte man API-Daten laden oder andere Logik für Daten angeben
    // Für jetzt verwenden wir dummyMissions
  }, []);

  return (
    <div>
      {missions.map((mission) => (
        <Mission
          key={mission.id}
          {...mission}
          onComplete={() => handleCompleteMission(mission.id)} // Übergabe der onComplete-Funktion
        />
      ))}
    </div>
  );
};

export default MissionList;
