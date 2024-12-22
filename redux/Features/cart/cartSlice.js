import { createSlice } from '@reduxjs/toolkit';
import * as SQLite from 'expo-sqlite';

// Функция для открытия или создания базы данных
const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('cart.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cart (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT,
        options TEXT,
        serving INTEGER,
        weight REAL,
        quantity INTEGER NOT NULL
      );
    `);
    console.log('База данных успешно открыта или создана');
    return db;
  } catch (error) {
    console.error('Ошибка при открытии базы данных:', error);
    throw error;
  }
};

// Глубокое клонирование объекта для удаления прокси
const cloneState = (state) => JSON.parse(JSON.stringify(state));

// Вспомогательные функции для работы с базой данных
const saveCartToDatabase = async (items) => {
  try {
    const db = await openDatabase();
    const plainItems = cloneState(items);

    for (const item of plainItems) {
      // Преобразование данных
      const id = String(item.id); // Убедимся, что ID — это строка
      const name = String(item.name);
      const price = parseFloat(item.price); // Преобразуем цену в число
      const image = String(item.image);
      const options = item.options ? String(item.options) : null; // Опционально
      const serving = parseFloat(item.serving); // Преобразуем порцию в число
      const weight = item.weight ? parseFloat(item.weight) : null; // Опционально
      const quantity = parseInt(item.quantity, 10); // Преобразуем количество в целое число

      // Проверка типов данных после преобразования
      if (
        !id ||
        typeof name !== 'string' ||
        isNaN(price) ||
        typeof image !== 'string' ||
        (options !== null && typeof options !== 'string') ||
        isNaN(serving) ||
        (weight !== null && isNaN(weight)) ||
        isNaN(quantity)
      ) {
        console.error('Ошибка: неверные типы данных для записи в базу:', item);
        continue;
      }

      await db.runAsync(
        `INSERT OR REPLACE INTO cart (id, name, price, image, options, serving, weight, quantity)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [id, name, price, image, options, serving, weight, quantity]
      );
    }
    console.log('Корзина успешно сохранена в базе:', plainItems);
  } catch (error) {
    console.error('Ошибка при сохранении корзины в базу данных:', error);
  }
};

const loadCartFromDatabase = async () => {
  try {
    const db = await openDatabase();
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
      const parsedServing = parseFloat(serving);
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
          options: options ? String(options) : null,
          serving: parsedServing,
          weight: parsedWeight,
          quantity: 1,
        });
        state.totalCount += 1;
        state.totalPrice += parsedPrice;
      }
    
      saveCartToDatabase(cloneState(state.items)); // Сохраняем изменения в базе данных
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

      // Сохраняем изменения в базе данных (клонируем состояние)
      saveCartToDatabase(cloneState(state.items));
    },
    removeDishFromCart: (state, action) => {
      const { id, quantity, price } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalCount -= quantity;
      state.totalPrice -= parseFloat(price) * quantity;

      // Сохраняем изменения в базе данных (клонируем состояние)
      saveCartToDatabase(cloneState(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;

      openDatabase().then((db) => {
        db.execAsync('DELETE FROM cart;');
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