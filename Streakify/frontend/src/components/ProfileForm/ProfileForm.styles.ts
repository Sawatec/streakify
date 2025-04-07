import styled from "styled-components";
import { brightGrey, mediumGreen } from "../../styles/Colors";

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column; /* Vertikale Anordnung der Formularelemente */
    padding: 20px; /* Abstand um das Formular */
    background-color: ${mediumGreen}; /* Hintergrundfarbe des Formulars auf mediumGreen setzen */
    border-radius: 8px; /* Abgerundete Ecken */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Schatten für das Formular */
    width: 100%; /* 100% Breite */
    height: 100%; /* 100% Höhe */
`;

export const FormTitle = styled.h2`
    margin-bottom: 20px; /* Abstand unter dem Titel */
    font-size: 24px; /* Schriftgröße des Titels */
    color: ${brightGrey}; /* Farbe des Titels */
`;

export const FormGroup = styled.div`
    margin-bottom: 15px; /* Abstand zwischen den Formelementen */
`;

export const Label = styled.label`
    display: block; /* Block-Element für das Label */
    margin-bottom: 5px; /* Abstand unter dem Label */
    font-weight: bold; /* Fettdruck für das Label */
`;

export const Input = styled.input`
    width: 100%; /* Volle Breite */
    padding: 10px; /* Innenabstand */
    border: 1px solid #ccc; /* Rahmenfarbe */
    border-radius: 4px; /* Abgerundete Ecken */
    font-size: 16px; /* Schriftgröße */
    &:focus {
        border-color: #007bff; /* Rahmenfarbe bei Fokus */
        outline: none; /* Entfernen des Standard-Fokusrahmens */
    }
`;

export const Button = styled.button`
    padding: 10px 15px; /* Innenabstand für den Button */
    background-color: #007bff; /* Hintergrundfarbe des Buttons */
    color: white; /* Schriftfarbe */
    border: none; /* Kein Rahmen */
    border-radius: 4px; /* Abgerundete Ecken */
    font-size: 16px; /* Schriftgröße */
    cursor: pointer; /* Zeiger beim Hover */
    transition: background-color 0.3s; /* Übergangseffekt */
    
    &:hover {
        background-color: #0056b3; /* Dunklere Farbe beim Hover */
    }
`;

export const BackButton = styled(Button)`
    background-color: #6c757d; /* Hintergrundfarbe für den Zurück-Button */
    
    &:hover {
        background-color: #5a6268; /* Dunklere Farbe beim Hover für Zurück-Button */
    }
`;

export const ErrorMessage = styled.div`
    color: red;
    margin-top: 10px;
    font-size: 0.8rem;
`;