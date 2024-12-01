import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    selectedDate: new Date().toISOString(), // Сохраняем в виде строки
  },
  reducers: {
    setDateType: (state, action) => {
      state.selectedDate = action.payload; // Ожидаем строку
    },
  },
});

export const { setDateType } = dateSlice.actions;

export default dateSlice.reducer;