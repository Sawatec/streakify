import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998; /* Direkt unter dem Modal */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background: #f7f7f7;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 9999; /* Erhöhen Sie den z-index, damit das Modal immer ganz oben liegt */
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
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

export const ModalBody = styled.div`
  padding: 20px;
`;

export const ModalFooter = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  margin-bottom: 20px;
`;

export const InfoLabel = styled.div`
  font-weight: bold;
  color: #444;
  width: 30%; /* Feste Breite für die Labels */
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 70%; /* Feste Breite für die Eingabefelder */
  padding: 8px;
  margin: 5px 0;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#FF0000' : '#ddd')};
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

export const Select = styled.select<{ $hasError?: boolean }>`
  width: 70%; /* Feste Breite für die Auswahlfelder */
  padding: 8px;
  margin: 5px 0;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#FF0000' : '#ddd')};
  border-radius: 5px;
  font-size: 0.9rem;
`;

export const Button = styled.button`
  background:#f39c12;
  border: none;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #f39c12;
  }
`;

export const InfoIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 10px;
`;

export const FrequencyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

export const FrequencyButton = styled.button<{ $active: boolean }>`
  background-color: ${({ $active }) => ($active ? '#2FA9A9' : '#145555')};
  color: ${(props) => (props.$active ? "#143d3d" : "#ffffff")};
  border: 1px solid #0B3131;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$active ? "#2FA9A9" : "#2FA9A9")};
    color: ${(props) => (props.$active ? "#143d3d" : "#143d3d")};
  }
`;

export const DurationInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

export const DurationInput = styled.input<{ $hasError?: boolean }>`
  width: 70%; /* Feste Breite für die Eingabefelder */
  padding: 8px;
  margin: 5px 0;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#FF0000' : '#ddd')};
  border-radius: 5px;
  font-size: 0.9rem;
`;

export const DurationText = styled.span<{ $active: boolean }>`
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? '#00c2ff' : '#00a5d9')};
  cursor: pointer;
  user-select: none;
`;

export const ErrorText = styled.span`
  color: #FF0000;
  font-size: 0.8rem;
  margin-left: 10px;
`;