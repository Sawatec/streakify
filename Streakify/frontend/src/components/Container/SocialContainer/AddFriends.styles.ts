import styled from "styled-components";
import { brightGrey, mediumGreen } from "../../../styles/Colors";

export const AddFriendsContainer = styled.div`
    margin: 20px; /* Abstand um den Container */
    padding: 15px; /* Innenabstand */
    border-radius: 8px; /* Abgerundete Ecken */
    background-color: ${mediumGreen}; /* Hintergrundfarbe */
    display: flex;
    flex-direction: column; /* Vertikale Anordnung der Inhalte */
    align-items: center; /* Zentriert die Inhalte horizontal */
`;

export const AddFriendsTitle = styled.h2`
    margin-bottom: 10px; /* Abstand unter dem Titel */
    font-size: 20px; /* Schriftgröße des Titels */
    color: ${brightGrey}; /* Farbe des Titels */
    text-align: center; /* Titel zentrieren */
`;

export const InputContainer = styled.div`
    display: flex; /* Flexbox für horizontale Anordnung */
    width: 100%; /* Volle Breite */
`;

export const InputField = styled.input`
    margin: 10px 0; /* Abstand um das Eingabefeld */
    padding: 10px; /* Innenabstand */
    border-radius: 4px; /* Abgerundete Ecken */
    border: 1px solid #ccc; /* Rahmen */
    flex: 1; /* Nimmt den verfügbaren Platz ein */
`;

export const SearchButton = styled.button`
    padding: 10px; /* Innenabstand */
    border-radius: 4px; /* Abgerundete Ecken */
    background-color: #4CAF50; /* Hintergrundfarbe */
    color: white; /* Schriftfarbe */
    border: none; /* Kein Rahmen */
    cursor: pointer; /* Zeiger-Cursor */
    margin-left: 10px; /* Abstand zwischen Eingabefeld und Button */
`;