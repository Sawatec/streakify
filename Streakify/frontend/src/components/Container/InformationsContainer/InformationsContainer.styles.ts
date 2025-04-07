import styled from "styled-components";

export const Container = styled.div`
    display: flex; /* Flexbox für die Anordnung */
    align-items: center; /* Vertikale Zentrierung der Inhalte */
    margin-bottom: 20px; /* Abstand unter dem Container */
    width: 100%; /* Container nimmt 100% der Breite ein */
`;

export const UserInfo = styled.div`
    display: flex; /* Flexbox für die Anordnung der Benutzerinformationen */
    flex-direction: column; /* Vertikale Anordnung für Benutzername und Beitrittsdatum */
    margin-left: 20px; /* Abstand zwischen Streak und Benutzerinformationen */
`;

export const Username = styled.h1`
    font-size: 20px; /* Schriftgröße für den Benutzernamen */
    color: #fffff; /* Farbe des Benutzernamens */
    margin: 0; /* Kein Abstand */
`;

export const JoinedDate = styled.p`
    font-size: 14px; /* Schriftgröße für das Beitrittsdatum */
    color: #ffffff; /* Farbe des Beitrittsdatums */
    margin: 5px 0 0 0; /* Abstand nur oben */
`;

export const StreakContainer = styled.div`
    display: flex; /* Flexbox für die Anordnung der Streak */
    align-items: center; /* Vertikale Zentrierung */
`;