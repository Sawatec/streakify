import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const twinkle = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;

export const StarsContainer = styled.div<{ show: boolean }>`
  position: absolute;
  top: -50px; /* Positioniere die Sterne über dem Button */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ show }) => (show ? 1 : 0)}; /* Sterne werden sichtbar, wenn show true ist */
  animation: ${fadeIn} 0.5s ease-in-out; /* Fade-In-Animation */
`;

export const Star = styled.div`
  font-size: 24px; /* Größe der Sterne */
  animation: ${twinkle} 1s infinite; /* Animation für die Sterne */
  margin: 0 5px; /* Abstand zwischen den Sternen */
`;