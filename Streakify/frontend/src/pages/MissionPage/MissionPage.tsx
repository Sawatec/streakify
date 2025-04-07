import React, { useState } from "react";
import {
  MissionPageContainer,
  Header,
  Title,
  Stats,
  TabSwitcher,
  Tab,
} from "./MissionPage.styles";
import Mission from "../../components/Mission/mission";
import Navbar from "../../components/Navbar/Navbar";
import { useMissions } from "../../components/Mission/missionsContext";

interface MissionProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  type: string;
  completed: boolean;
}

// Neues MissionGrid: Beibehaltung der Grid-Anordnung von links nach rechts
const MissionGrid: React.FC<{ missions: MissionProps[]; onComplete: (missionId: string) => void }> = ({ missions, onComplete }) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // Feste Anzahl von 3 Spalten
    gap: "15px",
    justifyContent: "center",
  };

  return (
    <div style={gridStyle}>
      {missions.map((mission) => (
        <Mission
          key={mission.id}
          {...mission}
          onComplete={() => onComplete(mission.id)} // Callback für Abschluss
        />
      ))}
    </div>
  );
};

const MissionPage: React.FC = () => {
  const { missions, updateMission, points } = useMissions(); // Punkte aus Context
  const [activeTab, setActiveTab] = useState("Einmalig");

  const filteredMissions = missions.filter((mission) => {
    if (activeTab === "Einmalig") return !mission.completed && mission.type === "Einmalig";
    if (activeTab === "Täglich") return !mission.completed && mission.type === "Täglich";
    if (activeTab === "Abgeschlossen") return mission.completed;
    return false;
  });

  // Funktion, um eine Mission abzuschließen
  const handleCompleteMission = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);
    if (mission && !mission.completed) {
      updateMission(missionId, { completed: true, progress: 100 }); // Mission abschließen
    }
  };

  return (
    <MissionPageContainer>
      <Navbar />
      <Header>
        <Title>Missionen</Title>
        <Stats>
          <span>Punkte: {points}</span> {/* Dynamische Punkteanzeige aus Context */}
        </Stats>
      </Header>

      <TabSwitcher>
        <Tab active={activeTab === "Einmalig"} onClick={() => setActiveTab("Einmalig")}>
          Einmalig
        </Tab>
        <Tab active={activeTab === "Täglich"} onClick={() => setActiveTab("Täglich")}>
          Täglich
        </Tab>
        <Tab active={activeTab === "Abgeschlossen"} onClick={() => setActiveTab("Abgeschlossen")}>
          Abgeschlossen
        </Tab>
      </TabSwitcher>

      <MissionGrid missions={filteredMissions} onComplete={handleCompleteMission} />
    </MissionPageContainer>
  );
};

export default MissionPage;
