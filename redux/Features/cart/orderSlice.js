import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SQLite from 'expo-sqlite';

// Открытие базы данных
const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('orders.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS orders (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT
      );
    `);
    return db;
  } catch (error) {
    console.error('Ошибка при открытии базы данных:', error);
    throw error;
  }
};

// Thunk для загрузки начального состояния из SQLite
export const loadInitialOrderState = createAsyncThunk(
  'order/loadInitialOrderState',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const db = await openDatabase();

      const keys = [
        'orderType',
        'selectedIndex',
        'address',
        'phoneNumber',
        'comment',
        'shortDate',
        'shortTime',
        'pay',
        'deliveryCost',
      ];

      for (const key of keys) {
        const rows = await db.getAllAsync(`SELECT value FROM orders WHERE key = ?;`, [key]);
        if (rows.length > 0) {
          const value = JSON.parse(rows[0].value);
          dispatch(setInitialOrderState({ key, value }));
        } else {
          console.warn(`Значение для ключа ${key} отсутствует в базе данных.`);
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке начального состояния из базы данных:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Функция для сохранения данных в SQLite
const saveToDatabase = async (key, value) => {
  try {
    const db = await openDatabase();
    await db.runAsync(
      'INSERT OR REPLACE INTO orders (key, value) VALUES (?, ?);',
      [key, JSON.stringify(value)]
    );
  } catch (error) {
    console.error(`Ошибка при сохранении данных для ключа ${key}:`, error);
    throw error;
  }
};

// Создание слайса Redux
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderType: 'Доставка', // По умолчанию "Доставка"
    selectedIndex: 0,
    address: '',
    phoneNumber: '',
    comment: '',
    shortDate: '',
    shortTime: '',
    pay: 'Наличные',
    deliveryCost: 0,
  },
  reducers: {
    setInitialOrderState: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value || state[key];
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
      saveToDatabase('orderType', state.orderType).catch((error) =>
        console.error(`Ошибка при сохранении orderType:`, error)
      );
    },
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
      saveToDatabase('selectedIndex', state.selectedIndex).catch((error) =>
        console.error(`Ошибка при сохранении selectedIndex:`, error)
      );
    },
    setAddress: (state, action) => {
      state.address = action.payload;
      saveToDatabase('address', state.address).catch((error) =>
        console.error(`Ошибка при сохранении address:`, error)
      );
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
      saveToDatabase('phoneNumber', state.phoneNumber).catch((error) =>
        console.error(`Ошибка при сохранении phoneNumber:`, error)
      );
    },
    setComment: (state, action) => {
      state.comment = action.payload;
      saveToDatabase('comment', state.comment).catch((error) =>
        console.error(`Ошибка при сохранении comment:`, error)
      );
    },
    setShortDate: (state, action) => {
      state.shortDate = action.payload;
      saveToDatabase('shortDate', state.shortDate).catch((error) =>
        console.error(`Ошибка при сохранении shortDate:`, error)
      );
    },
    setShortTime: (state, action) => {
      state.shortTime = action.payload;
      saveToDatabase('shortTime', state.shortTime).catch((error) =>
        console.error(`Ошибка при сохранении shortTime:`, error)
      );
    },
    setPay: (state, action) => {
      state.pay = action.payload;
      saveToDatabase('pay', state.pay).catch((error) =>
        console.error(`Ошибка при сохранении pay:`, error)
      );
    },
    setDeliveryCost: (state, action) => {
      state.deliveryCost = action.payload;
      saveToDatabase('deliveryCost', state.deliveryCost).catch((error) =>
        console.error(`Ошибка при сохранении deliveryCost:`, error)
      );
    },
  },
});

export const {
  setOrderType,
  setSelectedIndex,
  setAddress,
  setPhoneNumber,
  setComment,
  setShortDate,
  setShortTime,
  setPay,
  setDeliveryCost,
  setInitialOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;