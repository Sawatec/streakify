// Streak.styles.ts
import styled from "styled-components";

export const StreakContainer = styled.div`
    display: flex;
    flex-direction: column; /* Vertikale Anordnung für Zahl und Icon */
    align-items: center; /* Horizontale Zentrierung */
    position: relative; /* Relativ positioniert, damit die absolute Positionierung der Zahl funktioniert */
`;

export const Icon = styled.svg`
    height: 96px;
    width: 96px;
    fill: #FF8800; /* Hier können Sie die Farbe anpassen */
    position: relative;
`;

export const StreakNumber = styled.span`
    position: absolute;
    font-size: 24px; /* Schriftgröße für die Streak-Zahl */
    color: #FFFFFF; /* Farbe der Streak-Zahl */
    top: 50%; /* Positioniere die Zahl vertikal in der Mitte */
    left: 50%; /* Positioniere die Zahl horizontal in der Mitte */
    transform: translate(-50%, -50%); /* Verschiebe die Zahl um die Hälfte ihrer Breite und Höhe nach links und oben */
`;