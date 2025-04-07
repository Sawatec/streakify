import styled, { css, keyframes } from "styled-components";
import { brightGrey, darkGrey, darkOrange, primaryOrange } from "../../styles/Colors";

const breatheAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Container für den Habit
export const HabitContainer = styled.div<{ isNextHabit: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative; /* Ermöglicht die absolute Positionierung des Schattens */
  padding: 1rem;
  z-index: 1; /* Stellen Sie sicher, dass der z-index niedriger ist als der des Modals */

  &:hover {
    .habit-circle, .habit-shadow-circle {
      transform: scale(1.1); /* Zoom-Effekt bei Hover */
    }
    .uhrzeit {
      transform: translateY(-10px); /* 10px nach oben verschieben */
      font-size: 1rem; /* Größer werden */
      transition: transform 0.3s ease, font-size 0.3s ease; /* Animation für die Verschiebung und Größenänderung */
    }
    .habitName {
      font-size: 1rem; /* Größer werden */
      transition: font-size 0.3s ease; /* Animation für die Größenänderung */
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

// Der Kreis
export const HabitCircle = styled.div<{ isFulfilled: boolean }>`
  width: 3.75rem; /* 60px */
  height: 3.75rem; /* 60px */
  border-radius: 50%;
  background:${({ isFulfilled }) => {
    return (isFulfilled ? primaryOrange : brightGrey);
  }}; 
  margin-bottom: 0.625rem; /* 10px Abstand zum Text */
  transition: transform 0.3s ease;
  position: relative; /* Ermöglicht die absolute Positionierung des Schattens */
 
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 50%;
    height: 50%;
    fill: black; /* Ändert die Farbe der SVG-Bilder auf Schwarz */
  }

  @media (max-width: 768px) {
    width: 3rem; /* 48px */
    height: 3rem; /* 48px */
  }

  @media (max-width: 480px) {
    width: 2.5rem; /* 40px */
    height: 2.5rem; /* 40px */
  }
`;

// Der Schattenkreis
export const HabitShadowCircle = styled.div<{ isFulfilled: boolean }>`
  width: 4rem; /* 64px */
  height: 4rem; /* 64px */
  border-radius: 50%;
  background: ${({ isFulfilled }) => (isFulfilled ? darkOrange : darkGrey)};
  box-shadow: 0px 0.25rem 0.625rem rgba(0, 0, 0, 0.8);
  position: absolute;
  left: -2.5%; /* 5px leicht nach rechts verschoben */
  z-index: -2; 
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 3.25rem; /* 52px */
    height: 3.25rem; /* 52px */
    left: -2.5%;

  }

  @media (max-width: 480px) {
    width: 2.75rem; /* 44px */
    height: 2.75rem; /* 44px */

  }
`;

// Neuer Container für den grünen Ring
export const HabitCircleWrapper = styled.div<{ isNextHabit: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;


  ${({ isNextHabit }) =>
    isNextHabit &&
    css`
      &::before {
        content: '';
        position: absolute;
        width: 4.5rem; /* Größe des grünen Rings */
        height: 4.5rem;
        border: 2px solid #FF8800;
        border-radius: 50%;
        animation: ${breatheAnimation} 1.5s infinite ; /* Animation für den grünen Ring */
        top: -0.38rem;
      }
    `}
`;

// Beschriftung
export const HabitLabel = styled.div`
  text-align: center;
  font-size: 0.875rem; /* 14px */
  color: white;
  margin-top: 0.625rem; /* 10px Abstand zum Kreis */
  transition: transform 0.3s ease, font-size 0.3s ease;
  z-index: -1;

`;

// Uhrzeit
export const HabitTime = styled.span`
  font-size: 0.875rem; /* 14px */
  color: white;
  margin-bottom: 0.625rem; /* 10px Abstand zum Kreis */
  z-index: -1;
  transition: transform 0.3s ease, font-size 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.75rem; /* 12px */

  }

  @media (max-width: 480px) {
    font-size: 0.625rem; /* 10px */

  }
`;