import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dashboardReducer from './dashboardSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        dashboard: dashboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
