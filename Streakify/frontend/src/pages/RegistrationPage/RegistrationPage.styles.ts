import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInUp = keyframes`
  from {
    transform: translateY(250%);
    opacity: 0.8;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInDown = keyframes`
  from {
    transform: translateY(-250%);
    opacity: 0.8;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOutDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(250%);
    opacity: 0.8;
  }
`;

const slideOutUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-250%);
    opacity: 0;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const transformToLoader = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

interface ContainerProps {
  $slideInRight?: boolean;
  $slideInFromTop?: boolean;
  $slideOutRight?: boolean;
  $slideOutDown?: boolean;
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
          animation: ${slideInUp} 0.5s ease-in-out;
        `
      : ''}
  ${({ $slideInFromTop }) =>
    $slideInFromTop
      ? css`
          animation: ${slideInDown} 0.5s ease-in-out;
        `
      : ''}
  ${({ $slideOutRight }) =>
    $slideOutRight &&
    css`
      animation: ${slideOutUp} 0.5s ease-in-out forwards;
    `}
  ${({ $slideOutDown }) =>
    $slideOutDown &&
    css`
      animation: ${slideOutDown} 0.5s ease-in-out forwards;
    `}
`;

export const Form = styled.form<{ $hidden?: boolean }>`
  padding: 2rem;
  border-radius: 10px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideInUp} 0.5s ease-in-out;
  ${({ $hidden }) =>
    $hidden &&
    css`
      display: none;
    `}
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
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #d48f00;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
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

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 0.8rem;
`;

export const NotificationMessage = styled.div`
  font-size: 1rem;
  color: #ffffff;
  text-align: center;
  margin-top: 1rem;
  animation: ${fadeIn} 1s ease-in-out;
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

export const SwitchContainer = styled.div<{ $hidden?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* Position absolut setzen */
  top: -18rem; /* Abstand zum unteren Rand des Containers */
  width: 100%;
  cursor: pointer;
  color: #ffffff;
  animation: ${slideInUp} 0.5s ease-in-out;
  ${({ $hidden }) =>
    $hidden &&
    css`
      display: none;
    `}

  &:hover {
    color: #d48f00;
  }

  &.slide-out {
    animation: ${slideOutDown} 0.5s ease-in-out forwards;
  }

  span {
    font-size: 1.5rem; /* Größere Schriftgröße */
    margin-bottom: 0.5rem;
  }
`;

export const ArrowUp = styled.div`
  width: 40px;
  height: 40px;
  border-left: 2px solid  #FF8800;
  border-top: 2px solid  #FF8800;
  transform: rotate(45deg);
  margin-bottom: 0.5rem;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  visibility: hidden;

  &.visible {
    opacity: 1;
    visibility: visible;
  }
`;

export const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
`;

export const SuccessMessage = styled.div`
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  margin-top: 1rem;
  animation: ${fadeIn} 1s ease-in-out, ${slideOutUp} 0.5s 3.5s ease-in-out forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SuccessIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  &::before {
    content: '✔';
    color: #ffffff;
    font-size: 2rem;
  }
`;

export const TutorialContainer = styled.div<{ $animate?: boolean; $hidden?: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
  left: 5rem;
  color: #ffffff;
  animation: ${slideInUp} 0.5s ease-in-out;
  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${slideInUp} 0.5s ease-in-out forwards;
    `}
  ${({ $hidden }) =>
    $hidden &&
    css`
      display: none;
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