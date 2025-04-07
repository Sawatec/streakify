import styled from 'styled-components';
import { colors, fonts } from '../../styles/theme';

// Container für die gesamte Dashboard-Seite
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: ${fonts.primary};
  background-color: ${colors.background};
  color: ${colors.text};
`;

// Überschrift auf der Seite
export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${colors.text};
`;

// Button für den Redirect zur Profilseite
export const RedirectButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

// Container für den Companion und die SpeechBubble
export const CompanionContainer = styled.div`
  position: fixed;
  right: 14%;
  top: 24%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Navbar Container für die Platzierung der Navbar
export const NavbarWrapper = styled.div`
  width: 250px; /* Feste Breite der Navbar */
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh; /* Volle Höhe des Bildschirms */
  z-index: 1000;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 250px); /* Breite abzüglich der Navbar */
  margin-left: 250px; /* Platz für die Navbar lassen */
  padding: 20px;
`;

// Container für die Missionsliste
export const MissionListWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: ${colors.white};
  padding: 15px;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 10;

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
    text-align: center;
    font-weight: bold;
  }
`;

// Einzelne Missionsitems
export const MissionItem = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;

  h4 {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  p {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .progress-bar-container {
    height: 8px;
    background-color: ${colors.border};
    border-radius: 5px;
  }

  .progress-bar {
    height: 100%;
    background-color: ${colors.secondary};
    border-radius: 5px;
  }
`;

// Timetable Container
export const TimetableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding-top: 20px;
`;

// Kategorie Spalte
export const CategoryColumn = styled.div`
  position: relative;
  width: 100px;
  height: 80vh;
  border-left: 2px solid ${colors.border};
  margin: 0 20px;
`;

// Kategorie Titel
export const CategoryTitle = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: 1.2rem;
  color: ${colors.lightText};
`;

// Habit Item
export const HabitItem = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  white-space: nowrap;
`;