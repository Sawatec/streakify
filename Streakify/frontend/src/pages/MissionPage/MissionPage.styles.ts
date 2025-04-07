// MissionPage.styles.ts
import styled from 'styled-components';

export const MissionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #023C40; /* Dunkler Hintergrund passend zur Navbar */
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 30px 20px 10px; /* Platzierung angepasst für Konsistenz */
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Transparente Linie wie im Dashboard */
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  color: #FFC857; /* Gelbe Farbe für den Titel */
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Schatten wie im Dashboard */
`;

export const Stats = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  color: #FFC857;
  font-size: 1rem;
`;

export const PointsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  color: #FFC857;
`;

export const PointsIcon = styled.span`
  font-size: 2rem;
`;

export const PointsValue = styled.span`
  font-weight: bold;
`;

export const TabSwitcher = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0; /* Abstand zu den Tabs und den Missionen vergrößern */
  gap: 10px;
`;

export const Tab = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#075E63' : '#FFFFFF')}; /* Grüne aktive Tabs, weiße inaktive */
  color: ${({ active }) => (active ? '#FFFFFF' : '#075E63')};
  border: 2px solid #075E63;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #FFC857;
    color: #000;
  }
`;

export const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

export const MissionCard = styled.div`
  background-color: #DFF5E3; /* Leichtes Grün für die Missionen */
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const MissionTitle = styled.h3`
  font-size: 1.5rem;
  color: #023C40;
  margin-bottom: 10px;
`;

export const MissionDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 15px;
`;

export const ProgressBarWrapper = styled.div`
  margin-top: 10px;
  background-color: #F3F3F3;
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  background-color: #FFD700; /* Gelblich für den Fortschritt */
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.3s ease;
`;

export const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #FFC857;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
