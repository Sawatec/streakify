import styled, { keyframes, css } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
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

export const NotificationContainer = styled.div<{ isFadingOut: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #FF8800;
  color: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${({ isFadingOut }) => isFadingOut ? css`${slideOut} 0.5s ease-out` : css`${slideIn} 0.5s ease-out`};
  z-index: 1000;
`;

export const NotificationMessage = styled.div`
  font-size: 1rem;
`;