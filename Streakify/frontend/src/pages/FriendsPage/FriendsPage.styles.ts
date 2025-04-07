import styled from 'styled-components';

export const FriendsPageContainer = styled.div`
  display: flex;
  height: 100vh; // Volle Höhe des Viewports
`;

export const NavbarWrapper = styled.div`
  width: 200px; // Feste Breite der Navbar
  background-color: #f0f0f0; // Hintergrundfarbe der Navbar
`;

export const ContentContainer = styled.div`
  flex: 1; // Nimmt den restlichen Platz ein
  display: flex;
  padding: 20px 20px 20px 20px; // Innenabstand: oben, rechts, unten, links (links = 0)
`;

export const LeftContainer = styled.div`
  flex: 1; // Nimmt 50% des verfügbaren Platzes im ContentContainer ein
  margin-left: 70px; // Abstand zwischen Navbar und LeftContainer
  margin-right: 20px; // Abstand zwischen LeftContainer und RightContainer
`;

export const RightContainer = styled.div`
  flex: 1; // Nimmt 50% des verfügbaren Platzes im ContentContainer ein
  margin-right: 20px; // Abstand zwischen RightContainer und rechter Kante
  display: flex;
  flex-direction: column;
`;