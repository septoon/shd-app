// redux/Features/cart/orderHistorySlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Функция для сохранения истории заказов в AsyncStorage
const saveOrderHistoryToStorage = async (orders) => {
  try {
    await AsyncStorage.setItem('orderHistory', JSON.stringify(orders));
  } catch (error) {
    console.error('Ошибка при сохранении истории заказов в AsyncStorage:', error);
  }
};

// Функция для загрузки истории заказов из AsyncStorage
const loadOrderHistoryFromStorage = async () => {
  try {
    const orders = await AsyncStorage.getItem('orderHistory');
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Ошибка при загрузке истории заказов из AsyncStorage:', error);
    return [];
  }
};

// Начальное состояние
const initialState = {
  orders: [],
};

// Создаем слайс для истории заказов
const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    // Устанавливаем начальное состояние истории заказов из AsyncStorage
    setInitialOrderHistory: (state, action) => {
      state.orders = action.payload;
    },
    // Добавление нового заказа в историю
    addOrderToHistory: (state, action) => {
      const newOrder = action.payload;
      state.orders.push(newOrder);
    },
    // Очистка истории заказов
    clearOrderHistory: (state) => {
      state.orders = [];
    },
  },
});

// Экшены и редьюсер
export const {
  setInitialOrderHistory,
  addOrderToHistory,
  clearOrderHistory,
} = orderHistorySlice.actions;

export default orderHistorySlice.reducer;

// Асинхронное действие для инициализации истории заказов при запуске приложения
export const initializeOrderHistory = () => async (dispatch) => {
  const orderHistory = await loadOrderHistoryFromStorage();
  dispatch(setInitialOrderHistory(orderHistory));
};

// Асинхронное действие для добавления заказа и сохранения в AsyncStorage
export const addOrderToHistoryAsync = (order) => async (dispatch, getState) => {
  dispatch(addOrderToHistory(order));
  const { orders } = getState().orderHistory;
  await saveOrderHistoryToStorage(orders);
};

// Асинхронное действие для очистки истории заказов и сохранения изменений в AsyncStorage
export const clearOrderHistoryAsync = () => async (dispatch) => {
  dispatch(clearOrderHistory());
  await saveOrderHistoryToStorage([]);
};