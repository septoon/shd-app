import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SQLite from 'expo-sqlite';

// Открытие базы данных
const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('orders.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS orders (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT
    );
  `);
  console.log('База данных orders.db успешно открыта');
  return db;
};

// Thunk для загрузки начального состояния из SQLite
export const loadInitialOrderState = createAsyncThunk(
  'order/loadInitialOrderState',
  async (_, { dispatch }) => {
    try {
      const db = await openDatabase();

      const keys = ['orderType', 'selectedIndex', 'address', 'phoneNumber', 'comment'];
      for (const key of keys) {
        const rows = await db.getAllAsync(`SELECT value FROM orders WHERE key = ?;`, [key]);
        if (rows.length > 0) {
          dispatch(setInitialOrderState({ key, value: JSON.parse(rows[0].value) }));
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке начального состояния:', error);
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
    console.log(`Данные сохранены: ${key} = ${value}`);
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
  }
};

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderType: 'Доставка',
    selectedIndex: 0,
    address: '',
    phoneNumber: '',
    comment: '',
  },
  reducers: {
    setInitialOrderState: (state, action) => {
      state[action.payload.key] = action.payload.value || state[action.payload.key];
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
      saveToDatabase('orderType', state.orderType);
    },
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
      saveToDatabase('address', state.address);
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
      saveToDatabase('phoneNumber', state.phoneNumber);
    },
    setComment: (state, action) => {
      state.comment = action.payload;
      saveToDatabase('comment', state.comment);
    },
  },
});

export const {
  setOrderType,
  setSelectedIndex,
  setAddress,
  setPhoneNumber,
  setComment,
  setInitialOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;