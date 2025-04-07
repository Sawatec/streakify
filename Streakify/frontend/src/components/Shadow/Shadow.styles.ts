import styled from 'styled-components';

export const Shadow = styled.div`
  position: absolute;
  bottom: -0.5rem; 
  left: 0; /* Sicherstellen, dass der Schatten links ausgerichtet ist */
  width: 100%; /* Passt die Breite des Schattens an die Breite des übergeordneten Elements an */
  height: 10%; /* Höhe des Schattens relativ zur Höhe des übergeordneten Elements */
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  z-index: -1; /* Stellt sicher, dass der Schatten unter dem Element liegt */
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
`;

export const CompanionShadow = styled(Shadow)`
  bottom: 0.8rem; /* Spezifische Anpassung für den Companion */
  width: 98%;
  height: 22%; /* Spezifische Anpassung für den Companion */
  transform: rotateZ(-3deg);
`;