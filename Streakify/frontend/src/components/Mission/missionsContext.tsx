import React, { createContext, useState, useContext, ReactNode } from "react";

// Mission-Typ definieren
export interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  type: "Einmalig" | "Täglich"; // Kategorie der Mission
}

// Companion-Typ definieren
export interface Companion {
  id: number;
  name: string;
  price: number;
  owned: boolean; // Gibt an, ob der Companion gekauft wurde
}

// Standard-Dummy-Daten für Missionen
// Standard-Dummy-Daten
const initialMissions: Mission[] = [
  {
    id: "1",
    title: "Mission 1",
    description: "Schließe 5 Aufgaben diese Woche ab",
    completed: false,
    progress: 40,
    type: "Einmalig",
  },
  {
    id: "2",
    title: "Mission 2",
    description: "Trinke jeden Tag 2 Liter Wasser",
    completed: true,
    progress: 100,
    type: "Täglich",
  },
  {
    id: "3",
    title: "Mission 3",
    description: "Meditiere 10 Minuten pro Tag",
    completed: false,
    progress: 50,
    type: "Täglich",
  },
  {
    id: "4",
    title: "Mission 4",
    description: "Laufe insgesamt 10 km diese Woche",
    completed: false,
    progress: 30,
    type: "Einmalig",
  },
  {
    id: "5",
    title: "Mission 5",
    description: "Lies jeden Tag 20 Seiten in einem Buch",
    completed: false,
    progress: 20,
    type: "Täglich",
  },
  {
    id: "6",
    title: "Mission 6",
    description: "Schlafe mindestens 8 Stunden jede Nacht",
    completed: true,
    progress: 100,
    type: "Täglich",
  },
  {
    id: "7",
    title: "Mission 7",
    description: "Eine Woche ohne zuckerhaltige Snacks",
    completed: false,
    progress: 10,
    type: "Einmalig",
  },
  {
    id: "8",
    title: "Mission 8",
    description: "Mache 50 Liegestütze pro Tag",
    completed: false,
    progress: 60,
    type: "Täglich",
  },
  {
    id: "9",
    title: "Erstelle 3 Habits",
    description: "Erstelle 3 Habits, um diese Mission abzuschließen",
    completed: false,
    progress: 0, // Fortschritt beginnt bei 0
    type: "Einmalig",
  },
];

// Standard-Dummy-Daten für Companions
const initialCompanions: Companion[] = [
  { id: 1, name: "Nier", price: 20, owned: false },
  { id: 2, name: "Akali", price: 50, owned: false },
  { id: 3, name: "Spiderman", price: 30, owned: false },
];

// Context-Typ definieren
interface MissionsContextType {
  missions: Mission[];
  companions: Companion[];
  points: number;
  updateMission: (id: string, updatedMission: Partial<Mission>) => void;
  trackHabitCreation: () => void;
  purchaseItem: (price: number) => boolean; // Item kaufen
  purchaseCompanion: (id: number, price: number) => boolean; // Companion kaufen
}

// MissionsContext erstellen
const MissionsContext = createContext<MissionsContextType | undefined>(
  undefined
);

// MissionsProvider
const MissionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [companions, setCompanions] = useState<Companion[]>(initialCompanions);
  const [createdHabits, setCreatedHabits] = useState<number>(0);
  const [points, setPoints] = useState<number>(100);

  // Mission aktualisieren
  const updateMission = (id: string, updatedMission: Partial<Mission>) => {
    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === id ? { ...mission, ...updatedMission } : mission
      )
    );

    // Punkte hinzufügen, wenn die Mission abgeschlossen wird
    if (updatedMission.completed) {
      setPoints((prevPoints) => prevPoints + 10);
    }
  };

  // Habits tracken
  const trackHabitCreation = () => {
    setCreatedHabits((prev) => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        updateMission("9", { completed: true, progress: 100 });
      } else {
        updateMission("9", { progress: (newCount / 3) * 100 });
      }
      return newCount;
    });
  };

  // Items kaufen
  const purchaseItem = (price: number): boolean => {
    if (points >= price) {
      setPoints((prevPoints) => prevPoints - price); // Punkte abziehen
      return true;
    }
    return false;
  };

  // Companion kaufen
  const purchaseCompanion = (id: number, price: number): boolean => {
    const companion = companions.find((comp) => comp.id === id);
    if (companion?.owned) {
      return false; // Bereits gekauft
    }
    if (points >= price) {
      setPoints((prevPoints) => prevPoints - price); // Punkte abziehen
      setCompanions((prevCompanions) =>
        prevCompanions.map((comp) =>
          comp.id === id ? { ...comp, owned: true } : comp
        )
      );
      return true; // Kauf erfolgreich
    }
    return false; // Nicht genügend Punkte
  };

  return (
    <MissionsContext.Provider
      value={{
        missions,
        companions,
        points,
        updateMission,
        trackHabitCreation,
        purchaseItem,
        purchaseCompanion, // Companion-Kauf verfügbar machen
      }}
    >
      {children}
    </MissionsContext.Provider>
  );
};

// Custom Hook
export const useMissions = () => {
  const context = useContext(MissionsContext);
  if (!context) {
    throw new Error("useMissions must be used within a MissionsProvider");
  }
  return context;
};

export { MissionsProvider };
