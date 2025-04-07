import React from "react";
import { PopupContainer } from "./HabitInfoPopup.styles";
import { FaClock, FaStar } from "react-icons/fa";

interface HabitInfoPopupProps {
  name: string;
  description: string;
  time: string;
  xp: number;
  isVisible: boolean;
  className?: string; // Hinzufügen der className-Eigenschaft
}

const HabitInfoPopup: React.FC<HabitInfoPopupProps> = ({ name, description, time, xp, isVisible, className }) => {
  return (
    <PopupContainer className={`${isVisible ? "visible" : "hidden"} ${className}`}>
      <h4>{name}</h4>
      <p>{description}</p>
      <p className="time">
        <FaClock className="time-icon" /> {time}
      </p>
      <p className="xp">
        <FaStar className="xp-icon" /> {xp} XP
      </p>
    </PopupContainer>
  );
};

export default HabitInfoPopup;