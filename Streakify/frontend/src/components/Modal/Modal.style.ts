import styled, { keyframes } from "styled-components";

// Definieren Sie die Animationen
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50px);
  }
`;

export const Backdrop = styled.div<{ isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.3s ease;
`;

export const ModalContent = styled.div<{ isClosing: boolean }>`
  position: relative;
  background: #143d3d;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.3s ease;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #f7d354;
  }
`;

export const ActionButton = styled.button`
  background-color: #f7d354;
  color: #143d3d;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6c04c;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;