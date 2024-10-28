import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderType: "Доставка",
    selectedIndex: 0
  },
  reducers: {
    setSetOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
  },
});

export const {
  setSetOrderType,
  setSelectedIndex
} = orderSlice.actions;

export default orderSlice.reducer;