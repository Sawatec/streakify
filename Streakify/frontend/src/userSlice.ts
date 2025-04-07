import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string | null;
    token: string | null;
    name: string | null;
    email: string | null;
    profilePicture: string | null;
    isAdmin: boolean;
    companion: string | null;
    streak: number;
    xp: number; // Hinzufügen der XP-Eigenschaft
    level: number; // Hinzufügen der Level-Eigenschaft
}

const initialState: UserState = {
    id: null,
    token: null,
    name: null,
    email: null,
    profilePicture: null,
    isAdmin: false,
    companion: null,
    streak: 0,
    xp: 0, // Initialwert für XP
    level: 0, // Initialwert für Level
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ id: string; token: string; name: string; email: string; profilePicture: string; companion: string | null; streak: number; xp: number; level: number }>) {
            state.id = action.payload.id;
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.profilePicture = action.payload.profilePicture;
            state.companion = action.payload.companion;
            state.isAdmin = false;
            state.streak = action.payload.streak;
            state.xp = action.payload.xp; // XP setzen
            state.level = action.payload.level; // Level setzen
        },
        logout(state) {
            state.id = null;
            state.token = null;
            state.name = null;
            state.email = null;
            state.profilePicture = null;
            state.companion = null;
            state.isAdmin = false;
            state.streak = 0;
            state.xp = 0; // XP zurücksetzen
            state.level = 0; // Level zurücksetzen
        },
        updateProfilePicture(state, action: PayloadAction<string>) {
            state.profilePicture = action.payload;
        },
        updateCompanion(state, action: PayloadAction<string | null>) {
            state.companion = action.payload;
        },
        updateUserXP(state, action: PayloadAction<number>) {
            state.xp = action.payload;
        },
        updateUserLevel(state, action: PayloadAction<number>) {
            state.level = action.payload;
        },
    },
});

export const { login, logout, updateProfilePicture, updateCompanion, updateUserXP, updateUserLevel } = userSlice.actions;
export default userSlice.reducer;