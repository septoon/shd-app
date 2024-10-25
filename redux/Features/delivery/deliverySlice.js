import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDelivery = createAsyncThunk(
  'delivery/fetchDelivery',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.shashlichny-dom.ru/delivery.json?t=${Date.now()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  paidDelivery: null,
  deliveryStart: null,
  deliveryEnd: null,
  minDeliveryAmount: null,
  deliveryCost: null,
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
        state.paidDelivery = action.payload.paidDelivery
        state.deliveryStart = action.payload.deliveryStart
        state.deliveryEnd = action.payload.deliveryEnd
        state.minDeliveryAmount = action.payload.minDeliveryAmount
        state.deliveryCost = action.payload.deliveryCost
      })
      .addCase(fetchDelivery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default deliverySlice.reducer;