import styled from "styled-components";

export const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Verhindert Sichtbarkeit außerhalb */
`;

export const ItemWrapper = styled.div<{ position: "center" | "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.6s ease, opacity 0.6s ease;
  z-index: ${({ position }) => (position === "center" ? 3 : 2)};
  opacity: ${({ position }) => (position === "center" ? 1 : 0.7)};
  transform: ${({ position }) =>
    position === "center"
      ? "translate(-50%, -50%) scale(1.2)"
      : position === "left"
      ? "translate(-150%, -50%) scale(0.9)"
      : "translate(50%, -50%) scale(0.9)"};
`;
