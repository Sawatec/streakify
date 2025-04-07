import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh; /* Höhe der gesamten Seite */
`;

export const NavbarContainer = styled.div`
  width: 250px; /* Breite der Navbar */
  background-color: #0B3D3D; /* Hintergrundfarbe der Navbar */
`;

export const MainContent = styled.div`
  flex: 1; /* Nimmt den verbleibenden Platz ein */
  display: flex;
  padding: 20px; /* Optionaler Abstand */
`;

export const ProfileSection = styled.div`
  flex: 1; /* Nimmt 50% des Platzes ein */
  display: flex;
  flex-direction: column; /* Vertikale Anordnung der Elemente */
  justify-content: center; /* Zentriert die Elemente vertikal */
  align-items: center; /* Zentriert die Elemente horizontal */
  margin-right: 10px; /* Abstand zwischen den Elementen */
`;

export const SocialContainer = styled.div`
  flex: 1; /* Nimmt 50% des Platzes ein */
  display: flex;
  flex-direction: column; /* Vertikale Anordnung für Social Container */
`;