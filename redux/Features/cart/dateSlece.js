import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    selectedDate: new Date(),
    shortDate: null,
    shortTime: null,
  },
  reducers: {
    setDateType: (state, action) => {
      state.selectedDate = action.payload
      state.shortDate = state.selectedDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
      });
      state.shortTime = state.selectedDate.toLocaleTimeString('ru-RU', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
      });
    },
  },
});

export const {
  setDateType,
} = dateSlice.actions;

export default dateSlice.reducer;