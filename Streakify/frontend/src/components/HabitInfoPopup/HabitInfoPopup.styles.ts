import styled, { keyframes } from "styled-components";

// Definieren Sie die Animationen
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const fadeOutDown = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
`;

export const PopupContainer = styled.div`
  position: absolute;
  bottom: 100%; /* Positionieren Sie das Popup über dem Habit */
  left: 50%;
  transform: translate(-50%, 0);
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  z-index: 12230;
  width: 280px;
  text-align: center;
  color: #000; /* Sicherstellen, dass der Text sichtbar ist */
  opacity: 0;
  visibility: hidden;
  transition: visibility 0.4s ease;

  &.visible {
    visibility: visible;
    animation: ${fadeInUp} 0.4s ease forwards;
  }

  &.hidden {
    visibility: hidden;
    animation: ${fadeOutDown} 0.4s ease forwards;
  }

  h4 {
    margin: 0;
    font-size: 1.4rem;
    color: #333;
    font-weight: bold;
  }

  p {
    margin: 8px 0;
    font-size: 1rem;
    color: #555;
  }

  .xp {
    font-weight: bold;
    color: #ff9800;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .xp-icon {
    margin-right: 5px;
  }

  .time {
    font-weight: bold;
    color: #4caf50;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .time-icon {
    margin-right: 5px;
  }
`;