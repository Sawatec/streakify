import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Hintergrundüberlagerung */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Stelle sicher, dass dies über anderen Elementen liegt */
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: transparent; /* Kein harter weißer Rahmen */
  padding: 0; /* Kein unnötiges Padding */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
  max-height: 80%;
  overflow: hidden;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.6); /* Subtiler Schatten für Abhebung */
`;

export const CloseButton = styled.button`
  position: absolute;

  right: 10px; /* Abstand von rechts */
  background: none; /* Kein Hintergrund */
  border: none; /* Kein Rahmen */
  font-size: 4rem; /* Größere Schriftgröße für das "X" */
  color: #333;
  cursor: pointer;
  z-index: 1001; /* Sicherstellen, dass das "X" vor allem liegt */
  }
`;
