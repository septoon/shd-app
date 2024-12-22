import * as SQLite from 'expo-sqlite';
import axios from 'axios';

// Открываем базу данных
const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('menuData.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menu_data (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT
    );
  `);
  console.log('База данных menuData.db успешно создана или открыта.');
  return db;
};

// Функция для сохранения данных в SQLite
const saveToDatabase = async (db, key, value) => {
  try {
    await db.runAsync('INSERT OR REPLACE INTO menu_data (key, value) VALUES (?, ?);', [key, value]);
    console.log(`Данные успешно сохранены: ${key}`);
  } catch (error) {
    console.error(`Ошибка при сохранении данных в SQLite (key: ${key}):`, error);
  }
};

// Функция для получения данных из SQLite
const getFromDatabase = async (db, key) => {
  try {
    const rows = await db.getAllAsync('SELECT value FROM menu_data WHERE key = ?;', [key]);
    if (rows.length > 0) {
      console.log(`Данные успешно получены из SQLite: ${key}`);
      return rows[0].value;
    }
    return null;
  } catch (error) {
    console.error(`Ошибка при получении данных из SQLite (key: ${key}):`, error);
    return null;
  }
};

// Основная функция для получения данных
export const getData = async () => {
  try {
    const db = await openDatabase();

    // Получаем сохранённый ETag из базы данных
    const savedETag = await getFromDatabase(db, 'menuDataETag');

    // Конфигурируем заголовки запроса
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (savedETag) {
      headers['If-None-Match'] = savedETag;
    }

    // Выполняем GET-запрос с настроенным validateStatus
    const response = await axios.get(`${process.env.API_URL}/data.json`, {
      headers,
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 304;
      },
    });

    if (response.status === 200) {
      // Данные изменились, сохраняем новые данные и ETag
      const newETag = response.headers.etag;
      const data = response.data;

      await saveToDatabase(db, 'menuData', JSON.stringify(data));
      await saveToDatabase(db, 'menuDataETag', newETag);

      return data;
    } else if (response.status === 304) {
      // Данные не изменились, загружаем из базы данных
      const storedData = await getFromDatabase(db, 'menuData');
      return storedData ? JSON.parse(storedData) : null;
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);

    // В случае ошибки пытаемся загрузить данные из SQLite
    try {
      const db = await openDatabase();
      const storedData = await getFromDatabase(db, 'menuData');
      return storedData ? JSON.parse(storedData) : null;
    } catch (dbError) {
      console.error('Ошибка при попытке загрузить данные из SQLite:', dbError);
      return null;
    }
  }
};