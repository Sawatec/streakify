// item.styles.ts
import styled, { keyframes } from "styled-components";

export const ItemCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  width: 42vw;
  height: 50vh;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;

  /* Zentrierung */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* Medienabfragen */
  @media (max-width: 1440px) {
    width: 48vw;
    height: 55vh;
  }

  @media (max-width: 1024px) {
    width: 60vw;
    height: 60vh;
  }

  @media (max-width: 768px) {
    width: 80vw;
    height: 65vh;
  }
`;

export const ItemName = styled.h2`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2vw;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin: 0;
`;

export const ItemImageContainer = styled.div`
  position: relative;
  top: 25%;
  left: 10%;
  width: 45%;
  height: 55%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;
export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`; 
export const ItemImage = styled.img`
  width: 70%%;
  height: 70%; /* Füllt die Höhe des Containers */
  object-fit: cover; /* Schneidet das Bild zu, ohne es zu verzerren */
  animation: ${fadeIn} 2s ease;
  cursor: pointer; /* Cursor für Klickbarkeit */
`;
export const CompanionImage = styled.img`
  position: relative;
  width: 80%; /* Companion bleibt kleiner */
  height: auto;
  object-fit: contain;
  z-index: 2;
`; 

export const DescriptionButton = styled.button`
  background:rgb(103, 45, 239);
  color: #ffffff;
  padding: 0.8vw 1.5vw;
  font-size: 1.2vw;
  font-weight: bold;
  border: none;
  border-radius: 0.8vw;
  cursor: pointer;
  transition: background 0.3s ease;

  /* Platzierung direkt unter dem Bild */
  
 margin-top: 135px; /* Abstand nach oben */
  margin-right: 20%; /* Zentriert */
  margin-left: 12%; /* Zentriert */

 

  &:hover {
    background: #2980b9;
  }

  &:active {
    background: #1c6391;
  }
`;



export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  text-align: center;
`;

export const ModalImage = styled.img`
  max-width: 100%;
  border-radius: 12px;
`;

export const ModalDescription = styled.p`
  margin-top: 20px;
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.5;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #bdc3c7;
  transition: color 0.3s;

  &:hover {
    color: #2c3e50;
  }
`;
export const ItemDescription = styled.p`
  margin-top: 15px;
  font-size: 1vw;
  color: #7f8c8d;
  text-align: center;
  line-height: 1.5;
  padding: 10px;
  background: #ecf0f1;
  border-radius: 8px;
`;
export const ItemPrice = styled.p`
  position: absolute;
  top: 40%;
  right: 5%;
  font-size: 1.5vw;
  font-weight: bold;
  color: #27ae60;
  background: #ecf0f1;
  padding: 0.5vw 1vw;
  border-radius: 0.5vw;
`;

export const BuyButton = styled.button<{ owned?: boolean; isCenter?: boolean }>`
  position: absolute;
  bottom: 10%;
  right: 8%;
  background: ${(props) =>
    props.owned
      ? "linear-gradient(145deg, #b0b0b0, #8e8e8e)" /* Grau für bereits gekaufte Items */
      : "linear-gradient(145deg, #e74c3c, #c0392b)"}; /* Rot für nicht gekaufte Items */
  color: ${(props) => (props.owned ? "#666" : "#ffffff")}; /* Graue Schrift für gekaufte Items */
  padding: 1vw 2vw;
  font-size: 1.2vw;
  font-weight: bold;
  border: none;
  border-radius: 0.8vw;
  cursor: ${(props) =>
    props.owned ? "not-allowed" : props.isCenter ? "pointer" : "not-allowed"}; /* 'not-allowed' für gekaufte Items */
  pointer-events: ${(props) => (props.owned ? "none" : "auto")}; /* Klick deaktivieren für gekaufte Items */
  opacity: ${(props) => (props.owned ? "0.6" : "1")}; /* Gekaufte Items werden leicht verblasst dargestellt */
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.owned
      ? "none"
      : "0px 0.3vw 0.7vw rgba(0, 0, 0, 0.3), -0.2vw -0.2vw 0.5vw rgba(255, 255, 255, 0.2)"};

  &:hover {
    background: ${(props) =>
      props.owned
        ? "linear-gradient(145deg, #b0b0b0, #8e8e8e)" /* Keine Hover-Farbe für gekaufte Items */
        : props.isCenter
        ? "linear-gradient(145deg, #c0392b, #e74c3c)" /* Hover-Farbe für nicht gekaufte Items */
        : "none"};
    transform: ${(props) =>
      props.owned ? "none" : props.isCenter ? "translateY(-0.2vw)" : "none"};
  }

  &:active {
    background: ${(props) =>
      props.owned
        ? "linear-gradient(145deg, #b0b0b0, #8e8e8e)" /* Grau bleibt auch beim Klicken */
        : props.isCenter
        ? "#a93226"
        : "none"};
    transform: ${(props) =>
      props.owned ? "none" : props.isCenter ? "translateY(0)" : "none"};
    box-shadow: ${(props) =>
      props.owned
        ? "none"
        : props.isCenter
        ? "inset 0.2vw 0.2vw 0.5vw rgba(0, 0, 0, 0.3), inset -0.2vw -0.2vw 0.5vw rgba(255, 255, 255, 0.2)"
        : "none"};
  }
`;
