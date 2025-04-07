import styled from 'styled-components';
import { brightAccentGreen, darkOrange } from '../../styles/Colors';

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column; /* Vertikale Anordnung */
  justify-content: center; /* Inhalt vertikal zentrieren */
  align-items: center; /* Inhalt horizontal zentrieren */
  background-color: #145555; /* Dunkelgrün */
  padding: 20px;
  height: 100vh; /* Volle Höhe des Bildschirms */
  width: 250px; /* Feste Breite der Navbar */
  box-shadow: 0px 4px 16px 10px rgba(0, 0, 0, 0.25);
  position: fixed; /* Fixiert die Navbar am linken Rand */
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const NotificationBadge = styled.span`
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
`;

export const Logo = styled.h1`
  color: #FF8800; /* Akzentfarbe */
  font-size: 2.3rem;
  cursor: pointer;
  margin-bottom: 40px; /* Abstand unter dem Logo */
  margin-top: 45px; /* Kein Abstand über dem Logo */
`;

export const NavbarLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column; /* Vertikale Anordnung der Links */
  gap: 15px; /* Abstand zwischen Links */
  margin: 0;
  padding: 0;
  text-align: center; /* Zentriert den Text in den Links */
`;

export const NavbarLink = styled.li`
  a {
    text-decoration: none;
    color: white;
    padding: 10px 15px; /* Padding für Links */
    transition: background-color 0.3s;
    display: flex; /* Flexbox für die Ausrichtung von Icon und Text */
    align-items: center; /* Zentriert das Icon und den Text vertikal */

    &:hover {
      background-color: rgba(255, 136, 0, 0.2); /* Akzentfarbe beim Hover */
    }

    svg { /* Falls die Icons SVGs sind */
      margin-right: 10px; /* Abstand zwischen Icon und Text */
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Zentriert die Inhalte */
  margin-bottom: 20px; /* Abstand unter den Benutzerinformationen */

  img {
    width: 10em; /* Breite des Benutzerbildes */
    height: 10em; /* Höhe des Benutzerbildes */
    border-radius: 50%; /* Rundes Bild */
    margin-bottom: 30px; /* Abstand unter dem Bild */
  }

  div {
    color: white; /* Textfarbe */
    margin: 2px 0; /* Abstand zwischen den Textzeilen */
  }

  #level {
    color: ${brightAccentGreen}
  }

  #xp {
    color: ${darkOrange}
  }
`;

export const Divider = styled.hr`
  width: 100%; /* Volle Breite */
  border: 1px solid #A0A0A0; /* Farbe des horizontalen Strichs */
  margin: 20px 0; /* Abstand über und unter dem Strich */
`;

export const LogoutButton = styled.button`
  background-color: #FF8800; /* Akzentfarbe */
  color: white;
  border: none;
  padding: 10px 20px; /* Padding für den Button */
  border-radius: 5px; /* Abgerundete Ecken */
  cursor: pointer;
  margin-top: auto; /* Positioniert den Button ganz unten */
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 136, 0, 0.8); /* Dunklere Akzentfarbe beim Hover */
  }
`;

export const XPBarContainer = styled.div`
  width: 100%;
  background-color: #333; /* Hintergrundfarbe der XP-Leiste */
  border-radius: 5px; /* Abgerundete Ecken */
  overflow: hidden; /* Verhindert, dass der Inhalt überläuft */
  margin-top: 10px; /* Abstand nach oben */
`;

export const XPBar = styled.div<{ xp: number }>`
  width: ${({ xp }) => xp}%;
  background-color: ${darkOrange}; /* Farbe der gefüllten XP-Leiste */
  height: 20px; /* Höhe der XP-Leiste */
  transition: width 0.3s; /* Animation für die Breite */
`;

export const XPText = styled.div`
  color: white;
  text-align: center;
  margin-top: 5px; /* Abstand nach oben */
`;