import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 700px); /* Reduziert die Breite um den Abstand links und rechts */
  background-color: transparent;
  padding: 10px 2px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 20px; /* Abstand zur Navbar */
  margin-bottom: 20px; /* Abstand zur Navbar */
  box-sizing: border-box;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  color: #FFB347; /* Goldfarbener Text */
  margin: 0;
`;

export const DateDisplay = styled.div`
  font-size: 1rem;
  color: #7a7a7a; /* Grau für das Datum */
  margin-left: 10px;
`;

export const FilterOptions = styled.div`
  display: flex;
  gap: 16px; /* Abstände zwischen den Filter-Buttons */
`;

export const FilterButton = styled.button`
  font-size: 1rem;
  color: #7a7a7a; /* Grau für nicht aktive Buttons */
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    opacity: 1;
     color: #FFB347;
  }

  &.active {
    font-weight: bold;
    color: #FFB347; /* Goldfarbener Text für aktive Buttons */
    opacity: 1;
  }
`;