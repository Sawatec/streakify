import styled, { keyframes, css } from 'styled-components';

export const MissionContainer = styled.div`
  position: relative;
  background-color: #DFF5E3;
  border: 1px solid #B0D8A4;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 200px; /* Feste Höhe */
  box-sizing: border-box;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

// Titel der Mission
export const MissionTitle = styled.h3`
  font-size: 20px;
  color: #075E63; /* Dunkles Grün für Titel */
  margin-bottom: 10px;
  font-weight: bold;
`;

// Beschreibung der Mission
export const MissionDescription = styled.p`
  font-size: 16px;
  color: #4F4F4F; /* Dezentes Grau */
  margin-bottom: 15px;
`;

// Fortschrittsbalken-Container
export const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 6px; /* Runden die Ecken des Containers */
  overflow: hidden; /* Schneidet alles außerhalb des Containers ab */
`;

const liquid = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 0;
  }
`;


export const LiquidOverlay = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 215, 0, 0.6));
  animation: ${liquid} 2s infinite linear;
  pointer-events: none;
`;



export const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: 0; /* Start bei 0 */
  background-color: orange;
  border-radius: inherit; /* Erbt die Abrundung vom Container */
  position: relative;

  /* Animation für das Wachsen des Fortschrittsbalkens */
  animation: ${({ progress }) =>
    css`
      ${keyframes`
        from {
          width: 0;
        }
        to {
          width: ${progress}%;
        }
      `} 1.5s ease-out forwards;
    `};
`;


// Fortschrittsstatus
export const MissionStatus = styled.p`
  font-size: 16px;
  color: #075E63;
  font-weight: bold;
  margin-top: 10px;
`;

// Keyframes für Funkeleffekte
const sparkle = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.5);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
`;

// Stern-Komponente
export const Star = styled.div<{ top: number; left: number; delay: number }>`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: yellow;
  border-radius: 50%;
  animation: ${sparkle} 1.5s infinite ease-in-out;
  animation-delay: ${(props) => `${props.delay}s`};
  top: ${(props) => `${props.top}%`};
  left: ${(props) => `${props.left}%`};
`;

// Container für funkelnde Sterne
export const SparklingStars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Keine Interaktion */
  overflow: hidden; /* Schneidet Sterne ab, die außerhalb liegen */
`;

// Container für abgeschlossene Missionen
export const CompletedMission = styled(MissionContainer)`
  position: relative;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  pointer-events: none;
  height: 200px; /* Gleiche Höhe wie MissionContainer */
`;

export const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px; /* Gleichmäßiger Abstand */
  justify-content: center; /* Zentriert die Missionen */
  align-items: center; /* Zentriert auch vertikal */
`;
