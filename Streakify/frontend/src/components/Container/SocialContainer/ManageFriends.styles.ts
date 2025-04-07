import styled from "styled-components";
import { mediumGreen } from "../../../styles/Colors";

export const ManageFriendsContainer = styled.div`
    margin: 20px 20px 0 20px; /* Falls SocialContainer einen bestimmten margin-top-Wert nutzt */
    padding: 15px;
    border-radius: 8px;
    background-color: ${mediumGreen};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const ManageFriendsTitle = styled.h2`
    margin-bottom: 10px; /* Abstand unter dem Titel */
    font-size: 20px; /* Schriftgröße des Titels */
    color: #fff; /* Schriftfarbe des Titels auf weiß setzen für besseren Kontrast */
`;

export const Table = styled.table`
    width: 100%; /* Tabelle nimmt die volle Breite ein */
    border-collapse: collapse; /* Rahmen der Zellen zusammenführen */
`;

export const TableHeader = styled.th`
    background-color: #4CAF50; /* Hintergrundfarbe für den Header */
    color: white; /* Schriftfarbe für den Header */
    padding: 10px; /* Innenabstand für die Header-Zellen */
    text-align: left; /* Textausrichtung */
`;

export const TableCell = styled.td`
    border: 1px solid #ddd; /* Rahmen um die Zellen */
    padding: 8px; /* Innenabstand für die Zellen */
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2; /* Hintergrundfarbe für gerade Zeilen */
    }

    &:hover {
        background-color: #ddd; /* Hintergrundfarbe beim Hover */
    }
`;