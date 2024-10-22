import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для получения данных доставки
export const fetchDelivery = createAsyncThunk(
  'delivery/fetchDelivery',
  async () => {
    const response = await axios.get('https://api.shashlichny-dom.ru/delivery.json');
    return response.data;
  }
);

const initialState = {
  paidDelivery: null,
  deliveryStart: 10,
  deliveryEnd: 17,
  minDeliveryAmount: 2000,
  deliveryCost: 200,
  status: 'idle',
  error: null,
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDelivery.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDelivery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.paidDelivery = action.payload.paidDelivery;
        state.deliveryStart = action.payload.deliveryStart;
        state.deliveryEnd = action.payload.deliveryEnd;
        state.minDeliveryAmount = action.payload.minDeliveryAmount;
        state.deliveryCost = action.payload.deliveryCost;
      })
      .addCase(fetchDelivery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default deliverySlice.reducer;