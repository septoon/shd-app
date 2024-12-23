import { createSlice } from '@reduxjs/toolkit';
import * as SQLite from 'expo-sqlite';

let dbInstance = null;

// Функция для открытия или создания базы данных
const openDatabase = async () => {
  if (!dbInstance) {
    try {
      dbInstance = await SQLite.openDatabaseAsync('cart.db', { useNewConnection: true });
      await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS cart (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          price REAL NOT NULL,
          image TEXT,
          options TEXT,
          serving REAL,
          weight REAL,
          quantity INTEGER NOT NULL
        );
      `);
      console.log('База данных успешно открыта или создана');
    } catch (error) {
      console.error('Ошибка при открытии базы данных:', error);
      dbInstance = null;
    }
  }
  return dbInstance;
};

// Функция для сохранения корзины в базу данных
const saveCartToDatabase = async (cartItems) => {
  const itemsCopy = JSON.parse(JSON.stringify(cartItems)); // Создаём копию состояния
  try {
    const db = await openDatabase();
    if (!db) return;

    await db.execAsync('BEGIN TRANSACTION;');
    await db.execAsync('DELETE FROM cart;');

    for (const item of itemsCopy) {
      try {
        const id = item.id || '';
        const name = item.name || '';
        const price = parseFloat(item.price) || 0;
        const image = item.image || '';
        const options = item.options || '';
        const serving = item.serving ? parseFloat(item.serving) : null;
        const weight = item.weight ? parseFloat(item.weight) : null;
        const quantity = item.quantity || 1;

        if (
          typeof id !== 'string' ||
          typeof name !== 'string' ||
          isNaN(price) ||
          typeof image !== 'string' ||
          typeof options !== 'string' ||
          (serving !== null && isNaN(serving)) ||
          (weight !== null && isNaN(weight)) ||
          isNaN(quantity)
        ) {
          console.error('Ошибка: неверные типы данных для записи в базу:', item);
          continue;
        }

        await db.runAsync(
          'INSERT INTO cart (id, name, price, image, options, serving, weight, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
          [id, name, price, image, options, serving, weight, quantity]
        );
      } catch (error) {
        console.error('Ошибка при сохранении товара в базу:', error, item);
      }
    }

    await db.execAsync('COMMIT;');
    console.log('Корзина успешно сохранена в базе:', itemsCopy);
  } catch (error) {
    if (dbInstance) {
      await dbInstance.execAsync('ROLLBACK;');
    }
    console.error('Ошибка при сохранении корзины в базу данных:', error);
  }
};

// Функция для загрузки корзины из базы данных
const loadCartFromDatabase = async () => {
  try {
    const db = await openDatabase();
    if (!db) return [];

    const rows = await db.getAllAsync('SELECT * FROM cart;');
    console.log('Данные из базы корзины:', rows);
    return rows;
  } catch (error) {
    console.error('Ошибка при загрузке корзины из базы данных:', error);
    return [];
  }
};

// Начальное состояние корзины
const initialState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setInitialCartState: (state, action) => {
      state.items = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.totalPrice = action.payload.totalPrice;
    },
    addDishToCart: (state, action) => {
      const { id, name, price, image, options, serving, weight } = action.payload;

      const parsedPrice = parseFloat(price);
      const parsedServing = serving ? parseFloat(serving) : null;
      const parsedWeight = weight ? parseFloat(weight) : null;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalCount += 1;
        state.totalPrice += parsedPrice;
      } else {
        state.items.push({
          id: String(id),
          name: String(name),
          price: parsedPrice,
          image: String(image),
          options: options ? String(options) : '',
          serving: parsedServing,
          weight: parsedWeight,
          quantity: 1,
        });
        state.totalCount += 1;
        state.totalPrice += parsedPrice;
      }

      saveCartToDatabase(state.items); // Сохраняем изменения в базе данных
    },
    decrementDishFromCart: (state, action) => {
      const { id, price } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalCount -= 1;
          state.totalPrice -= parseFloat(price);
        } else {
          state.items = state.items.filter((item) => item.id !== id);
          state.totalCount -= 1;
          state.totalPrice -= parseFloat(price);
        }
      }

      saveCartToDatabase(state.items);
    },
    removeDishFromCart: (state, action) => {
      const { id, quantity, price } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalCount -= quantity;
      state.totalPrice -= parseFloat(price) * quantity;

      saveCartToDatabase(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;

      openDatabase().then((db) => {
        if (db) db.execAsync('DELETE FROM cart;');
        console.log('Корзина успешно очищена');
      });
    },
  },
});

export const {
  setInitialCartState,
  addDishToCart,
  decrementDishFromCart,
  removeDishFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Асинхронная функция для инициализации корзины при запуске
export const initializeCart = () => async (dispatch) => {
  try {
    const items = await loadCartFromDatabase();
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    dispatch(
      setInitialCartState({
        items,
        totalCount,
        totalPrice,
      })
    );
    console.log('Корзина успешно инициализирована:', items);
  } catch (error) {
    console.error('Ошибка при инициализации корзины:', error);
  }
};