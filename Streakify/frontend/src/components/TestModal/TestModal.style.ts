import styled, { keyframes } from "styled-components";
import { colors, fonts } from '../../styles/theme';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998; /* Direkt unter dem Modal */
`;

export const ModalContainer = styled.div`
  position: absolute;
  background: #f7f7f7;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 9999; /* Erhöhen Sie den z-index, damit das Modal immer ganz oben liegt */
`;

export const Header = styled.div`
  background: #444;
  color: white;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 1;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  z-index: 100;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;
`;

export const UserName = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

export const XP = styled.div`
  font-size: 0.9rem;
  color: ${colors.primary};
  font-weight: bold ; 
`;

export const FireIcon = styled.div`
  font-size: 1.5rem;
`;

export const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Inhalte linksbündig ausrichten */
  width: 100%; /* Volle Breite nutzen */
`;

export const Title = styled.h3`
  margin-bottom: 5%;
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
`;

export const Subtitle = styled.h4`
  margin: 10px 0 5px;
  font-size: 1rem;
  color: #666;
`;

export const Description = styled.p`
  margin: 10px 0 0;
  font-size: 0.9rem;
  color: #444; /* Gleiche Farbe wie die Labels */
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center; /* Zentriert die Labels vertikal */
  margin: 7px 0;
  width: 100%; /* Volle Breite nutzen */
`;

export const InfoLabel = styled.div`
  font-weight: bold;
  color: #444;
  width: 30%; /* Feste Breite für die Labels */
  margin-right: 2rem;
`;

export const InfoValue = styled.div`
  color: #666;
  width: 70%; /* Feste Breite für die Werte */
`;

export const Footer = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const CancelButton = styled.button`
  background: transparent;
  border: 2px solid #aaa;
  color: #aaa;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    border-color: #888;
    color: #888;
  }
`;

export const ConfirmButton = styled.button`
  background: #00c2ff;
  border: none;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: #00a5d9;
  }
`;

export const Input = styled.input`
  width: 70%; /* Feste Breite für die Eingabefelder */
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
`;

export const TextArea = styled.textarea`
  width: 70%; /* Feste Breite für die Textbereiche */
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
`;

export const Select = styled.select`
  width: 70%; /* Feste Breite für die Auswahlfelder */
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

export const XPRow = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  &::after {
    content: '';
    display: inline-block;
    animation: ${typing} 2s steps(40, end) forwards;
  }
`;

export const XPBarContainer = styled.div`
  width: 100%;
  background: #ddd;
  border-radius: 5px;
  margin-top: 10px;
`;

export const XPBar = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  background: ${colors.primary};
  height: 10px;
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
`;