import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MissionServices, { MissionResponse } from "./ApiServices/MissionServices";

// Asynchrone Aktion zum Abrufen der Missionen
export const fetchMissions = createAsyncThunk<MissionResponse[], string>(
  "missions/fetchMissions", // actionType
  async (token) => {
    const data = await MissionServices.getMissions(token); // API-Aufruf, um Missionen zu holen
    return data; // Gibt die Missionen zurück
  }
);

// Slice für Missionen
const missionSlice = createSlice({
  name: "missions",
  initialState: {
    missions: [] as MissionResponse[], // Leeres Array für die Missionen
    loading: false, // Der Ladezustand
    error: null as string | null, // Der Fehlerzustand
  },
  reducers: {}, // Falls keine synchronen Aktionen definiert werden, bleibt dies leer
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.loading = true;
        state.error = null; // Fehler zurücksetzen
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.loading = false;
        state.missions = action.payload; // Speichern der abgerufenen Missionen
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unbekannter Fehler"; // Fehler setzen
      });
  },
});

export default missionSlice.reducer; // Exportiere den Reducer
