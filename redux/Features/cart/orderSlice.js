import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderType: "Доставка",
  },
  reducers: {
    setSetOrderType: (state, action) => {
      state.orderType = action.payload;
    },
  },
});

export const {
  setSetOrderType,
} = orderSlice.actions;

export default orderSlice.reducer;