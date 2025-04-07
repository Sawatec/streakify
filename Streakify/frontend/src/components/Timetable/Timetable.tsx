import React from 'react';
import styled from 'styled-components';
import Habit from '../Habit/Habit';

interface HabitProps {
  id: string;
  name: string;
  category: string;
  time: string; 
  fulfilled: boolean;
  description: string;
  frequency: string[];
  level: number;
  xp: number;
  duration: number; 
  durationType: "hours" | "minutes";
  friends: string[];
  runtime: number;
  user: string;
  streak: number; // Hinzufügen der Streak-Eigenschaft
}

interface TimetableProps {
  habits: HabitProps[];
  onDeleteHabit: (id: string) => void;
  filter: string;
  nextHabitId: string | null;
  nextHabitDay: string | null; // Hinzufügen des nächsten Habit-Tages
  fetchHabits: () => void; // Hinzufügen der fetchHabits-Funktion
}

const Timetable: React.FC<TimetableProps> = ({ habits, onDeleteHabit, filter, nextHabitId, nextHabitDay, fetchHabits }) => {
  const daysOfWeek = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

  const calculatePosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const percentageOfDay = totalMinutes / (24 * 60);
    return percentageOfDay * 100;
  };

  if (filter === "7d") {
    return (
      <TimetableContainer>
        {daysOfWeek.map(day => (
          <DayColumn key={day}>
            <DayTitle>{day}</DayTitle>
            {habits
              .filter(habit => habit.frequency.includes(day) || habit.frequency.includes("Täglich"))
              .map(habit => {
                const startPosition = calculatePosition(habit.time);
                const isNextHabit = habit.id === nextHabitId && nextHabitDay === day;
                return (
                  <HabitContainer key={habit.id} style={{ top: `${startPosition}%` }}>
                    <Habit
                      id={habit.id}
                      name={habit.name}
                      category={habit.category}
                      time={habit.time}
                      fulfilled={habit.fulfilled}
                      description={habit.description}
                      frequency={habit.frequency}
                      level={habit.level}
                      xp={habit.xp}
                      duration={habit.duration}
                      durationType={habit.durationType}
                      friends={habit.friends}
                      runtime={habit.runtime}
                      user={habit.user}
                      onDeleteHabit={onDeleteHabit}
                      isNextHabit={isNextHabit} 
                      fetchHabits={fetchHabits} // Hinzufügen der fetchHabits-Funktion
                      currentDay={day} // Übergeben der currentDay-Eigenschaft
                      streak={habit.streak} // Hinzufügen der Streak-Eigenschaft
                    />
                  </HabitContainer>
                );
              })}
          </DayColumn>
        ))}
      </TimetableContainer>
    );
  }

  // Standardansicht für "Heute"
  const categories = Array.from(new Set(habits.map(habit => habit.category)));

  return (
    <TimetableContainer>
      {categories.map(category => (
        <CategoryColumn key={category}>
          <CategoryTitle>{category}</CategoryTitle>
          {habits
            .filter(habit => habit.category === category)
            .map(habit => {
              const startPosition = calculatePosition(habit.time);
              return (
                <HabitContainer key={habit.id} style={{ top: `${startPosition}%` }}>
                  <Habit
                    id={habit.id}
                    name={habit.name}
                    category={habit.category}
                    time={habit.time}
                    fulfilled={habit.fulfilled}
                    description={habit.description}
                    frequency={habit.frequency}
                    level={habit.level}
                    xp={habit.xp}
                    duration={habit.duration}
                    durationType={habit.durationType}
                    friends={habit.friends}
                    runtime={habit.runtime}
                    user={habit.user}
                    onDeleteHabit={onDeleteHabit}
                    isNextHabit={habit.id === nextHabitId}
                    fetchHabits={fetchHabits} // Hinzufügen der fetchHabits-Funktion
                    currentDay={new Date().toLocaleDateString('de-DE', { weekday: 'long' })} // Übergeben des aktuellen Tages
                    streak={habit.streak}
                  />
                </HabitContainer>
              );
            })}
        </CategoryColumn>
      ))}
    </TimetableContainer>
  );
};

export default Timetable;

const TimetableContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Links ausrichten */
  align-items: flex-start;
  width: 100%;
  padding-top: 20px;
  z-index: 0; /* Stellen Sie sicher, dass der z-index niedriger ist als der des Modals */
`;

const CategoryColumn = styled.div`
  position: relative;
  width: 60px; /* Reduzierte Breite */
  height: 80vh;
  border-left: 2px solid rgba(255, 255, 255, 0.2); /* Weniger auffällige Farbe */
  margin: 0 50px;
  z-index: 0;
`;

const CategoryTitle = styled.div`
  position: absolute;
  top: -30px;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  white-space: nowrap; /* Verhindert Zeilenumbruch */
  color: #888; /* Gedämpfte Farbe für bessere Lesbarkeit */
  z-index: 0;
`;

const HabitContainer = styled.div`
  position: absolute;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto; /* Höhe des Habit-Kreises */
  z-index: -1;
`;

const DayColumn = styled.div`
  position: relative;
  width: 60px; /* Reduzierte Breite */
  height: 80vh;
  border-left: 2px solid rgba(255, 255, 255, 0.2); /* Weniger auffällige Farbe */
  margin: 0 50px;
  z-index: 0;
`;

const DayTitle = styled.div`
  position: absolute;
  top: -30px;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  white-space: nowrap;
  color: #888;
  z-index: -1;
`;