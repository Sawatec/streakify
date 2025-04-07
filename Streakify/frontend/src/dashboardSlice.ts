import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
  pageTitle: string;
  currentDate: string;
}

const initialState: DashboardState = {
  pageTitle: 'Dashboard',
  currentDate: '',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setPageTitle(state, action: PayloadAction<string>) {
      state.pageTitle = action.payload;
    },
    setCurrentDate(state, action: PayloadAction<string>) {
      state.currentDate = action.payload;
    },
  },
});

export const { setPageTitle, setCurrentDate } = dashboardSlice.actions;
export default dashboardSlice.reducer;