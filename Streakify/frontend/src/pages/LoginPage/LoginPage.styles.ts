import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0.8;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0.8;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const slideOutUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

interface ContainerProps {
  $slideInRight?: boolean;
  $slideInFromTop?: boolean;
  $slideOutRight?: boolean;
  $slideOutUp?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: fixed; /* Fixiert den Container */
  top: 0;
  left: 0;
  width: 100%;
  animation: ${fadeIn} 1s ease-in-out;
  ${({ $slideInRight }) =>
    $slideInRight
      ? css`
          animation: ${slideInRight} 0.3s ease-in-out;
        `
      : ''}
  ${({ $slideInFromTop }) =>
    $slideInFromTop
      ? css`
          animation: ${slideIn} 0.3s ease-in-out;
        `
      : ''}
  ${({ $slideOutRight }) =>
    $slideOutRight &&
    css`
      animation: ${slideOutRight} 0.3s ease-in-out forwards;
    `}
  ${({ $slideOutUp }) =>
    $slideOutUp &&
    css`
      animation: ${slideOutUp} 0.3s ease-in-out forwards;
    `}
`;

export const Form = styled.form`
  background-color: #0B3D3D;
  padding: 2rem;
  border-radius: 10px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.slide-out {
    animation: ${slideOut} 0.3s ease-in-out forwards;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #FF8800;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #d48f00;
  }
`;

export const SocialButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: #1F7171;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const TermsText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #a3c3b4;

  a {
    color: #FF8800;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  display: none;
  cursor: pointer;

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* Position absolut setzen */
  top: 20rem; /* Abstand zum unteren Rand des Containers */
  width: 100%;
  cursor: pointer;
  color: #ffffff;
  animation: ${slideIn} 0.3s ease-in-out;

  &:hover {
    color: #d48f00;
  }

  &.slide-out {
    animation: ${slideOut} 0.3s ease-in-out forwards;
  }

  span {
    font-size: 1.5rem; /* Größere Schriftgröße */
    margin-bottom: 0.5rem;
  }
`;

export const ArrowDown = styled.div`
  width: 40px;
  height: 40px;
  border-left: 2px solid  #FF8800;
  border-top: 2px solid  #FF8800;
  transform: rotate(-135deg);
  margin-bottom: 0.5rem;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const TutorialContainer = styled.div<{ $animate?: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ $animate }) => ($animate ? '100%' : '5rem')}; /* Startet außerhalb des Bildschirms */
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #ffffff;
  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${slideInRight} 0.3s ease-in-out forwards;
    `}

  &:hover {
    color: #d48f00;
  }

  span {
    font-size: 1.5rem;
    margin-left: 0.5rem;
  }
`;

export const ArrowLeft = styled.div`
   width: 40px;
  height: 40px;
  border-left: 1.5px solid  #FF8800;
  border-top: 1.5px solid  #FF8800;
  transform: rotate(-45deg);
  margin-right: 0.5rem;
`;