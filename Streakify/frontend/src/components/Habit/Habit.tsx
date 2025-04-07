import React, { useState, useRef } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { HabitContainer, HabitTime, HabitLabel, HabitCircleWrapper } from "./Habit.styles";
import HabitCircles from "./HabitCircles";
import { HabitIcon, FitnessIcon, MindfulnessIcon, EducationIcon, ShoppingIcon, FriendsGroupIcon, HealthIcon, WorkIcon, HobbiesIcon, SocialIcon, SelfCareIcon, ExerciseIcon, LearningIcon, FinanceIcon, ProductivityIcon, EnvironmentIcon } from "../../icons/Icon";
import TestModal from "../TestModal/TestModal";
import ReactDOM from "react-dom";
import { Backdrop } from "../TestModal/TestModal.style";
import HabitServices from "../../ApiServices/HabitServices";

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
  onDeleteHabit: (id: string) => void;
  isNextHabit: boolean;
  fetchHabits: () => void; // Hinzufügen der fetchHabits-Funktion
  currentDay: string; // Hinzufügen der currentDay-Eigenschaft
  streak: number; // Hinzufügen der Streak-Eigenschaft
}

const Habit: React.FC<HabitProps> = ({
  id,
  name,
  description,
  time,
  fulfilled,
  category,
  frequency,
  level,
  xp,
  duration,
  durationType,
  friends,
  runtime,
  user,
  isNextHabit,
  onDeleteHabit,
  fetchHabits, // Hinzufügen der fetchHabits-Funktion
  currentDay, // Hinzufügen der currentDay-Eigenschaft
  streak, // Hinzufügen der Streak-Eigenschaft
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, positionAbove: false });
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const habitRef = useRef<HTMLDivElement>(null);
  const token = useSelector((state: RootState) => state.user.token);

  const handleMouseEnter = () => {
    if (habitRef.current && !isClicked) {
      const rect = habitRef.current.getBoundingClientRect();
      const positionAbove = rect.bottom + 400 > window.innerHeight; // 400px ist die Höhe des Modals
      setModalPosition({ top: positionAbove ? rect.top - 250 : rect.bottom - 10, left: rect.left + rect.width / 2, positionAbove });
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    if (habitRef.current) {
      const rect = habitRef.current.getBoundingClientRect();
      const positionAbove = rect.bottom + 400 > window.innerHeight; // 400px ist die Höhe des Modals
      setModalPosition({ top: positionAbove ? rect.top - 250 : rect.bottom - 10, left: rect.left + rect.width / 2, positionAbove });
    }
    setIsClicked(true);
    setIsHovered(true);
  };

  const handleClose = () => {
    setIsClicked(false);
    setIsHovered(false);
    setShowDeleteOptions(false);
  };

  const handleDelete = async () => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    if (frequency.length > 1 || frequency.includes("Täglich")) {
      setShowDeleteOptions(true);
    } else {
      await HabitServices.deleteHabit(id, token);
      onDeleteHabit(id);
      fetchHabits(); // Liste nach dem Löschen eines einzelnen Habits aktualisieren
      handleClose();
    }
  };

  const handleDeleteSingle = async () => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    let updatedFrequency = frequency.filter(day => day !== currentDay);

    if (frequency.includes("Täglich")) {
      updatedFrequency = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"].filter(day => day !== currentDay);
    }

    console.log("updatedFrequency", updatedFrequency);

    if (updatedFrequency.length === 0) {
      await HabitServices.deleteHabit(id, token);
      onDeleteHabit(id);
      fetchHabits(); // Liste nach dem Löschen eines einzelnen Habits aktualisieren
    } else {
      console.log("update frequencz", updatedFrequency);
      await HabitServices.updateHabit({ _id: id, userId: user, name, description, category, time, duration, durationType, frequency: updatedFrequency, level, xp, fulfilled, streak, friends, runtime }, token);
      fetchHabits(); // Liste nach dem Aktualisieren eines Habits aktualisieren
    }
    handleClose();
  };

  const handleDeleteSeries = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      return;
    }

    await HabitServices.deleteHabit(id, token);
    onDeleteHabit(id);
    fetchHabits(); // Liste nach dem Löschen der gesamten Serie aktualisieren
    handleClose();
  };

  const handleComplete = async () => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      await HabitServices.completeHabit(id, token);
      fetchHabits(); // Liste nach dem Aktualisieren eines Habits aktualisieren
      handleClose();
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Fitness":
        return <FitnessIcon />;
      case "Achtsamkeit":
        return <MindfulnessIcon />;
      case "Bildung":
        return <EducationIcon />;
      case "Einkaufen":
        return <ShoppingIcon />;
      case "Freunde":
        return <FriendsGroupIcon />;
      case "Gesundheit":
        return <HealthIcon />;
      case "Arbeit":
        return <WorkIcon />;
      case "Hobbys":
        return <HobbiesIcon />;
      case "Soziales":
        return <SocialIcon />;
      case "Selbstfürsorge":
        return <SelfCareIcon />;
      case "Übung":
        return <ExerciseIcon />;
      case "Lernen":
        return <LearningIcon />;
      case "Finanzen":
        return <FinanceIcon />;
      case "Produktivität":
        return <ProductivityIcon />;
      case "Umwelt":
        return <EnvironmentIcon />;
      default:
        return <HabitIcon />;
    }
  };

  return (
    <div style={{ position: "relative" }} ref={habitRef}>
      <HabitContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} isNextHabit={isNextHabit}>
        <HabitTime className="uhrzeit">{time}</HabitTime>
        <HabitCircleWrapper isNextHabit={isNextHabit}>
          <HabitCircles category={category} getCategoryIcon={getCategoryIcon} isFulfilled={fulfilled} />
        </HabitCircleWrapper>
        <HabitLabel className="habitName">
          <span>{name}</span>
        </HabitLabel>
      </HabitContainer>
      {isHovered &&
        ReactDOM.createPortal(
          <>
            {isClicked && <Backdrop onClick={handleClose} />}
            <div
              style={{
                position: "fixed",
                top: `${modalPosition.top}px`,
                left: `${modalPosition.left}px`,
                transform: modalPosition.positionAbove ? "translate(-50%, -100%)" : "translate(-50%, 0)",
                zIndex: 9999,
              }}
            >
              <TestModal
                habit={{ id, name, description, category, time, duration, frequency, level, xp, streak, fulfilled }}
                isExpanded={isClicked}
                onClose={handleClose}
                onDelete={handleDelete}
                showDeleteOptions={showDeleteOptions}
                onDeleteSingle={handleDeleteSingle}
                onDeleteSeries={handleDeleteSeries}
                fetchHabits={fetchHabits} // Hinzufügen der fetchHabits-Funktion
                onComplete={handleComplete} // Hinzufügen der onComplete-Funktion
              />
            </div>
          </>,
          document.body
        )}
    </div>
  );
};

export default Habit;