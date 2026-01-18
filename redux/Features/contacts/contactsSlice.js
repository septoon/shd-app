import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../common/config';

// Асинхронный thunk для получения данных доставки
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(`${API_URL}/contacts.json?t=${Date.now()}`);
    return response.data;
  }
);

const initialState = {
  phoneNumber: '+ 7 (978) 697-84-75',
  address: 'г. Алушта, ул. Ленина 13, ул. Парковая 2',
  scheduleStart: 10,
  scheduleEnd: 23,
  status: 'idle',
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.phoneNumber = action.payload.phoneNumber;
        state.address = action.payload.address;
        state.scheduleStart = action.payload.scheduleStart;
        state.scheduleEnd = action.payload.scheduleEnd;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;
