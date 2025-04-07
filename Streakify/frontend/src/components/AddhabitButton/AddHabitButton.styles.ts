import styled from 'styled-components';
import { Shadow } from '../Shadow/Shadow.styles';

export const Container = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover ${Shadow} {
    transform:  scale(1.4); 
    box-shadow: 0 0 5px rgba(0, 136, 0, 0.3); 
    background-color: rgba(0, 30, 0, 0.2); 
  }
`;

export const Button = styled.button`
  position: relative;
  z-index: 1; 
  width: 10vw; 
  height: 10vw; 
  max-width: 4rem; 
  max-height: 4rem;
  border-radius: 50%;
  border: none;
  background-color: #FF8800;
  color: #143d3d;
  font-size: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10%) scale(1.1); 
    box-shadow: 0 0 10px rgba(255, 136, 0, 0.5);
  }
`;