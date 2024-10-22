import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для получения данных доставки
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get('https://api.shashlichny-dom.ru/contacts.json');
    return response.data;
  }
);

const initialState = {
  phoneNumber: '+ 7 (978) 697-84-75',
  address: 'г. Алушта, ул. Ленина 13, ул. Парковая 2',
  schedule: '10:00 - 23:00',
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
        state.schedule = action.payload.schedule;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;