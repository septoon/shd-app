import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для загрузки данных меню
export const fetchMenuData = createAsyncThunk(
  'menu/fetchMenuData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/data.json?t=${Date.now()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    selectedCategory: 'Холодные закуски',
    menuData: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menuData = action.payload || {};
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setSelectedCategory } = menuSlice.actions;

export default menuSlice.reducer;