import React from "react";
import styled from "styled-components";

interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <Message>{message}</Message>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>Ja</ConfirmButton>
          <CancelButton onClick={onCancel}>Abbrechen</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default ConfirmationModal;

// Styled Components
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #000; /* Schwarz */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ConfirmButton = styled.button`
  background-color: #27ae60;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #1e8449;
  }
`;

const CancelButton = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #c0392b;
  }
`;
