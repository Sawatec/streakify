import styled, { keyframes } from "styled-components";

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
    transform: translateY(250%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
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

const progressAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const slideOutDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(250%);
    opacity: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  animation: ${slideIn} 1s ease-in-out;
`;

export const Form = styled.form`
  padding: 2rem;
  border-radius: 10px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

export const Instructions = styled.p`
  margin-bottom: 1rem;
  text-align: center;
  color: #ffffff;
`;

export const Input = styled.input`
  width: 100%;
  background: rgb(1, 24, 24);
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color:rgb(0, 123, 255);
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }
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

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #218838;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 0.8rem;
`;

export const Timer = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: #ffffff;
`;

export const ProgressBar = styled.div<{ value: number; max: number }>`
  width: 100%;
  height: 20px;
  margin-top: 1rem;
  background-color: #f3f3f3;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    display: block;
    height: 100%;
    width: ${({ value, max }) => (value / max) * 100}%;
    background: linear-gradient(90deg,rgb(70, 76, 163),rgb(107, 161, 231));
    border-radius: 10px;
    animation: ${progressAnimation} 1s linear infinite alternate forwards running ;
    background-size: 200% 100%;
  }
`;

export const Tooltip = styled.div`
  position: relative;
  display: none;
  cursor: pointer;

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

export const TooltipText = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the tooltip above the text */
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;

export const SuccessMessage = styled.div`
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  margin-top: 1rem;
  animation: ${fadeIn} 1s ease-in-out, ${slideOutDown} 0.5s 3.5s ease-in-out forwards;
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

export const SwitchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* Position absolut setzen */
  bottom: 20rem; /* Abstand zum unteren Rand des Containers */
  width: 100%;
  cursor: pointer;
  color: #ffffff;
  animation: ${slideIn} 0.5s ease-in-out;

  &:hover {
    color: #d48f00;
  }

  &.slide-out {
    animation: ${slideOut} 0.5s ease-in-out forwards;
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