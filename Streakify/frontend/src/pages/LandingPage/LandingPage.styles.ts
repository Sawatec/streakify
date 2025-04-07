import styled, { keyframes, css } from "styled-components";

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0.8;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ContainerBase = styled.div`
  position: relative; /* Verwandt zur absoluten Positionierung von Companion */
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled(ContainerBase)<{ $slideOut: boolean }>`
  animation: ${slideInLeft} 0.3s ease-in-out;
  ${({ $slideOut }) =>
    $slideOut &&
    css`
      animation: ${slideOutRight} 0.3s forwards;
    `}
`;