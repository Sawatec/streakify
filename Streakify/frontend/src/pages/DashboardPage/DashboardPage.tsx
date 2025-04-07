import React, { useEffect, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {
  DashboardContainer,
  NavbarWrapper,
  CompanionContainer,
  MissionListWrapper,
  MissionItem,
  ContentWrapper
} from "./DashboardPage.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AddHabitButton from "../../components/AddhabitButton/AddHabitButton";
import CreateHabitModal from "../../components/CreateHabitModal/CreateHabitModal";
import Companion from "../../components/Companion/Companion";
import SpeechBubble from "../../components/SpeechBubble/SpeechBubble";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import { useMissions } from "../../components/Mission/missionsContext";
import HabitServices, { HabitResponse } from "../../ApiServices/HabitServices";
import UserServices from "../../ApiServices/UserServices";
import Timetable from '../../components/Timetable/Timetable';

// Lazy Loading der Mission-Komponente
const Mission = React.lazy(() => import("../../components/Mission/mission"));

export interface HabitProps {
  id: string;
  name: string;
  description: string;
  time: string;
  fulfilled: boolean;
  category: string;
  frequency: string[];
  level: number;
  xp: number;
  duration: number;
  durationType: "hours" | "minutes";
  friends: string[];
  runtime: number;
  user: string;
  streak: number | 0; // Hinzufügen der Streak-Eigenschaft
}

const DashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState<HabitProps[]>([]);
  const [filteredHabits, setFilteredHabits] = useState<HabitProps[]>([]);
  const [activeFilter, setActiveFilter] = useState("Heute");
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.id);
  const userName = useSelector((state: RootState) => state.user.name);
  const navigate = useNavigate();
  const { trackHabitCreation } = useMissions();
  const { missions, updateMission } = useMissions(); // MissionsContext verwenden
  const [nextHabitId, setNextHabitId] = useState<string | null>(null);
  const [nextHabitDay, setNextHabitDay] = useState<string | null>(null); // Hinzufügen des nächsten Habit-Tages
  const [speechText, setSpeechText] = useState<{ text: string; highlightedText?: string }>({ text: "" });
  const [welcomeShown, setWelcomeShown] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveHabit = async (habit: any, token: string) => {
    try {
      habit.user = userId;
      const savedHabit = await HabitServices.createHabit(habit, token);
      const newHabit: HabitProps = {
        id: savedHabit._id,
        name: savedHabit.name,
        description: savedHabit.description,
        time: savedHabit.time,
        fulfilled: savedHabit.fulfilled,
        category: savedHabit.category,
        frequency: savedHabit.frequency || [], // Sicherstellen, dass frequency nicht undefined ist
        level: savedHabit.level,
        xp: savedHabit.xp, // XP vom Backend übernehmen
        duration: savedHabit.duration,
        durationType: savedHabit.durationType,
        friends: savedHabit.friends,
        runtime: savedHabit.runtime,
        user: savedHabit.userId,
        streak: savedHabit.streak || 0, // Hinzufügen der Streak-Eigenschaft
      };
      setHabits([...habits, newHabit]);
      handleCloseModal();

      // Aktualisiere die Mission für das Erstellen von 3 Habits
      trackHabitCreation(); // Hier die Funktion aufrufen, um den Fortschritt zu tracken

      // Rufen Sie die fetchHabits-Funktion auf, um die Liste der Habits zu aktualisieren
      fetchHabits();
    } catch (error) {
      console.error("Fehler beim Speichern des Habits:", error);
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      const response = await HabitServices.deleteHabit(id, token!);
      if (response) {
        // Entferne das gelöschte Habit aus dem State
        setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Habits:", error);
    }
  };

  const fetchHabits = async () => {
    try {
      const fetchedHabits = await HabitServices.getHabits(token!);
      const habits: HabitProps[] = fetchedHabits.map((habit: HabitResponse) => ({
        id: habit._id,
        name: habit.name,
        description: habit.description,
        time: habit.time,
        fulfilled: habit.fulfilled,
        category: habit.category,
        frequency: habit.frequency || [], // Sicherstellen, dass frequency nicht undefined ist
        level: habit.level,
        xp: habit.xp,
        duration: habit.duration,
        durationType: habit.durationType,
        friends: habit.friends,
        runtime: habit.runtime,
        user: habit.userId,
        streak: habit.streak,
      }));
      setHabits(habits);
      filterHabits(habits, activeFilter);
    } catch (error) {
      console.error("Fehler beim Abrufen der Habits:", error);
    }
  };

  const filterHabits = (habits: HabitProps[], filter: string) => {
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString('de-DE', { weekday: 'long' });

    if (filter === "Heute") {
      const todayHabits = habits.filter(habit =>
        habit.frequency.includes("Täglich") || habit.frequency.includes(dayOfWeek)
      );
      setFilteredHabits(todayHabits);
    } else if (filter === "7d") {
      const weekHabits = habits.filter(habit =>
        habit.frequency.includes("Täglich") || habit.frequency.some(day => ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"].includes(day))
      );
      setFilteredHabits(weekHabits);
    }
    // Weitere Filterlogik für "2w", "1m" kann hier hinzugefügt werden
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const verificationResponse = await UserServices.verifyUser(token!);
        if (!verificationResponse.success) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Fehler bei der Benutzerüberprüfung:", error);
        navigate("/login");
      }
    };

    if (!token) {
      navigate("/login");
    } else {
      verifyUser();
      fetchHabits();
    }
  }, [token, navigate]);

  const getNextHabit = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const dayOfWeek = now.toLocaleDateString('de-DE', { weekday: 'long' });

    console.log("Aktuelle Zeit:", currentTime); // Debugging-Log
    console.log("Wochentag:", dayOfWeek); // Debugging-Log

    const upcomingHabits = habits
      .filter((habit) => habit.frequency.includes("Täglich") || habit.frequency.includes(dayOfWeek))
      .map((habit) => {
        const [hours, minutes] = habit.time.split(":").map(Number);
        const habitTime = hours * 60 + minutes;
        return { ...habit, habitTime };
      })
      .filter((habit) => habit.habitTime >= currentTime)
      .sort((a, b) => a.habitTime - b.habitTime);

    console.log("Anstehende Habits:", upcomingHabits); // Debugging-Log

    return upcomingHabits.length > 0 ? upcomingHabits[0] : null;
  };

  const getNextHabitDay = (nextHabit: HabitProps | null) => {
    if (!nextHabit) return null;
    const now = new Date();
    const dayOfWeek = now.toLocaleDateString('de-DE', { weekday: 'long' });
    if (nextHabit.frequency.includes("Täglich")) {
      return dayOfWeek;
    }
    return nextHabit.frequency.find(day => day === dayOfWeek) || null;
  };

  useEffect(() => {
    if (userName) {
      console.log("Benutzername:", userName); // Log the user name

      const showWelcome = !localStorage.getItem("welcomeShown");
      if (showWelcome) {
        setSpeechText({ text: `Willkommen,`, highlightedText: `${userName}!` });
        localStorage.setItem("welcomeShown", "true");
        setWelcomeShown(true);
      } else {
        const nextHabit = getNextHabit();
        setNextHabitId(nextHabit?.id || null); // Setzen der ID des nächsten anstehenden Habits
        setNextHabitDay(getNextHabitDay(nextHabit)); // Setzen des nächsten Habit-Tages
        if (!nextHabit) {
          setSpeechText({ text: "Für heute steht kein Habit an." });
        } else {
          setSpeechText({ text: "Das nächste anstehende Habit ist:", highlightedText: nextHabit.name });
        }
      }
    }
  }, [userName, habits]);

  useEffect(() => {
    if (welcomeShown) {
      const timer = setTimeout(() => {
        const nextHabit = getNextHabit();
        setNextHabitId(nextHabit?.id || null); // Setzen der ID des nächsten anstehenden Habits
        setNextHabitDay(getNextHabitDay(nextHabit)); // Setzen des nächsten Habit-Tages
        if (!nextHabit) {
          setSpeechText({ text: "Für heute steht kein Habit an." });
        } else {
          setSpeechText({ text: "Das nächste anstehende Habit ist:", highlightedText: nextHabit.name });
        }
        setWelcomeShown(false);
      }, 5000); // 5 Sekunden Verzögerung

      return () => clearTimeout(timer);
    }
  }, [welcomeShown, habits]);

  useEffect(() => {
    const nextHabit = getNextHabit();
    setNextHabitId(nextHabit?.id || null); // Setzen der ID des nächsten anstehenden Habits
    setNextHabitDay(getNextHabitDay(nextHabit)); // Setzen des nächsten Habit-Tages
  }, [habits]);

  useEffect(() => {
    filterHabits(habits, activeFilter);
  }, [habits, activeFilter]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    filterHabits(habits, filter);
  };

  if (!token) return null;

  const sortedHabits = filteredHabits.sort((a, b) => {
    const [aHours, aMinutes] = a.time.split(":").map(Number);
    const [bHours, bMinutes] = b.time.split(":").map(Number);
    return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
  });

  return (
    <DashboardContainer>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <ContentWrapper>
        <DashboardHeader onFilterChange={handleFilterChange} />
        <Timetable habits={sortedHabits} onDeleteHabit={handleDeleteHabit} filter={activeFilter} nextHabitId={nextHabitId} nextHabitDay={nextHabitDay} fetchHabits={fetchHabits} /> {/* Übergeben der nextHabitId und nextHabitDay */}
      </ContentWrapper>
      <CreateHabitModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={(habit) => handleSaveHabit(habit, token!)}
        existingHabits={habits} // Übergeben Sie die bestehenden Habit-Namen
      />
      <AddHabitButton onClick={handleOpenModal} />
      <CompanionContainer>
        <SpeechBubble text={speechText.text} highlightedText={speechText.highlightedText} />
        <Companion />
      </CompanionContainer>

      {/* Lazy Loading für Missionsliste unten rechts */}
      <MissionListWrapper>
        <h3>Offene Missionen</h3>
        <Suspense fallback={<div>Lade Missionen...</div>}>
          {missions
            .filter((mission) => !mission.completed)
            .map((mission) => (
              <MissionItem key={mission.id}>
                <h4>{mission.title}</h4>
                <p>{mission.description}</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${mission.progress}%` }}></div>
                </div>
              </MissionItem>
            ))}
        </Suspense>
      </MissionListWrapper>
    </DashboardContainer>
  );
};

export default DashboardPage;