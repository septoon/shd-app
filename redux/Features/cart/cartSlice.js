import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Функция для сохранения данных в AsyncStorage
const saveCartToStorage = async (items, totalCount, totalPrice) => {
  try {
    await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    await AsyncStorage.setItem('totalCount', JSON.stringify(totalCount));
    await AsyncStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  } catch (error) {
    console.error('Ошибка при сохранении данных в AsyncStorage:', error);
  }
};

// Функция для загрузки данных из AsyncStorage
const loadCartFromStorage = async () => {
  try {
    const items = await AsyncStorage.getItem('cartItems');
    const totalCount = await AsyncStorage.getItem('totalCount');
    const totalPrice = await AsyncStorage.getItem('totalPrice');
    return {
      items: items ? JSON.parse(items) : [],
      totalCount: totalCount ? JSON.parse(totalCount) : 0,
      totalPrice: totalPrice ? JSON.parse(totalPrice) : 0,
    };
  } catch (error) {
    console.error('Ошибка при загрузке данных из AsyncStorage:', error);
    return {
      items: [],
      totalCount: 0,
      totalPrice: 0,
    };
  }
};

const initialState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

// Создаем slice корзины
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Устанавливаем начальное состояние корзины из AsyncStorage
    setInitialCartState: (state, action) => {
      state.items = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.totalPrice = action.payload.totalPrice;
    },
    // Добавление блюда в корзину
    addDishToCart: (state, action) => {
      const { id, name, price, image, options, serving, weight } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
    
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalCount += 1;
        state.totalPrice += parseFloat(price);  // Убедитесь, что price всегда число
      } else {
        state.items.push({ id, name, price: parseFloat(price), image, options, serving, weight, quantity: 1 });
        state.totalCount += 1;
        state.totalPrice += parseFloat(price);
      }
      // Сохраняем обновленные данные в AsyncStorage
      saveCartToStorage(state.items, state.totalCount, state.totalPrice);
    },
    // Уменьшение количества или удаление блюда
    decrementDishFromCart: (state, action) => {
      const { id, price } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalCount -= 1;
          state.totalPrice -= parseFloat(price);
        } else {
          state.items = state.items.filter(item => item.id !== id);
          state.totalCount -= 1;
          state.totalPrice -= parseFloat(price);
        }
      }

      // Сохраняем обновленные данные в AsyncStorage
      saveCartToStorage(state.items, state.totalCount, state.totalPrice);
    },
    // Удаление блюда полностью
    removeDishFromCart: (state, action) => {
      const { id, quantity, price } = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.totalCount -= quantity;
      state.totalPrice -= parseFloat(price) * quantity;

      // Сохраняем обновленные данные в AsyncStorage
      saveCartToStorage(state.items, state.totalCount, state.totalPrice);
    },
    // Очистка корзины
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;

      // Очищаем данные в AsyncStorage
      saveCartToStorage(state.items, state.totalCount, state.totalPrice);
    },
  },
});

// Экшены и редьюсер
export const {
  setInitialCartState,
  addDishToCart,
  decrementDishFromCart,
  removeDishFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Асинхронное действие для инициализации состояния корзины при запуске приложения
export const initializeCart = () => async (dispatch) => {
  const cartData = await loadCartFromStorage();
  dispatch(setInitialCartState(cartData));
};