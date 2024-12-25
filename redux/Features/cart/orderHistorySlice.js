import { createSlice } from '@reduxjs/toolkit';
import * as SQLite from 'expo-sqlite';

// Функция для открытия базы данных
const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('orderHistory.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS order_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT
    );
  `);
  return db;
};

const loadOrderHistoryFromDatabase = async (db) => {
  try {
    const rows = await db.getAllAsync('SELECT data FROM order_history');
    return rows.map((row) => JSON.parse(row.data));
  } catch (error) {
    console.error('Ошибка при загрузке истории заказов из SQLite:', error);
    return [];
  }
};

// Функция для сохранения нового заказа в SQLite
const saveOrderToDatabase = async (db, order) => {
  try {
    await db.runAsync('INSERT INTO order_history (data) VALUES (?);', [
      JSON.stringify(order),
    ]);
  } catch (error) {
    console.error('Ошибка при добавлении заказа в SQLite:', error);
  }
};

// Функция для очистки истории заказов из SQLite
const clearOrderHistoryFromDatabase = async (db) => {
  try {
    await db.execAsync('DELETE FROM order_history;');
  } catch (error) {
    console.error('Ошибка при очистке истории заказов из SQLite:', error);
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
    // Устанавливаем начальное состояние истории заказов
    setInitialOrderHistory: (state, action) => {
      state.orders = action.payload;
    },
    // Добавление нового заказа в историю
    addOrderToHistory: (state, action) => {
      state.orders.push(action.payload);
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
  try {
    const db = await openDatabase();
    const orderHistory = await loadOrderHistoryFromDatabase(db);
    dispatch(setInitialOrderHistory(orderHistory));
  } catch (error) {
    console.error('Ошибка при инициализации истории заказов:', error);
  }
};

// Асинхронное действие для добавления заказа и сохранения в SQLite
export const addOrderToHistoryAsync = (order) => async (dispatch) => {
  try {
    const db = await openDatabase();
    dispatch(addOrderToHistory(order));
    await saveOrderToDatabase(db, order);
  } catch (error) {
    console.error('Ошибка при добавлении заказа в историю:', error);
  }
};

// Асинхронное действие для очистки истории заказов и SQLite
export const clearOrderHistoryAsync = () => async (dispatch) => {
  try {
    const db = await openDatabase();
    dispatch(clearOrderHistory());
    await clearOrderHistoryFromDatabase(db);
  } catch (error) {
    console.error('Ошибка при очистке истории заказов:', error);
  }
};