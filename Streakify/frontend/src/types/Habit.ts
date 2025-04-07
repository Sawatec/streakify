// src/types/Habit.ts
export interface Habit {
    id: string; // oder number, je nach deiner Datenbankstruktur
    name: string;
    description?: string; // Optional, falls du eine Beschreibung hast
    createdAt: string; // oder Date, je nach deinem Datentyp
    updatedAt: string; // oder Date, je nach deinem Datentyp
}