import React from "react";
import { HabitCircle, HabitShadowCircle } from "./Habit.styles";

interface HabitCirclesProps {
  category: string;
  getCategoryIcon: (category: string) => JSX.Element;
  isFulfilled: boolean;
}

const HabitCircles: React.FC<HabitCirclesProps> = ({ category, getCategoryIcon, isFulfilled }) => {
  return (
    <div style={{ position: "relative" }}>
      <HabitShadowCircle className="habit-shadow-circle" isFulfilled={isFulfilled} />
      <HabitCircle className="habit-circle" isFulfilled={isFulfilled}>
        {getCategoryIcon(category)}
      </HabitCircle>
    </div>
  );
};

export default HabitCircles;