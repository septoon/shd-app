import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ключ для хранения значения в AsyncStorage
const STORAGE_KEY = 'toggle_mode';

const initialState = {
  isEnabled: false, // Значение по умолчанию
};

const toggleItemsDisplaySlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.isEnabled = action.payload;
      // Сохраняем значение в AsyncStorage
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
    },
    loadToggle: (state, action) => {
      // Устанавливаем значение из AsyncStorage
      state.isEnabled = action.payload;
    },
  },
});

// Асинхронная функция для загрузки значения из AsyncStorage
export const loadToggleFromStorage = () => async (dispatch) => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      dispatch(toggleItemsDisplaySlice.actions.loadToggle(JSON.parse(value)));
    }
  } catch (error) {
    console.error('Failed to load toggle state from storage:', error);
  }
};

// Экспортируем экшены и редюсер
export const { setToggle } = toggleItemsDisplaySlice.actions;
export default toggleItemsDisplaySlice.reducer;