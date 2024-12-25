import axios from 'axios';

// Функция для проверки подключения к интернету
const checkInternetConnection = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' }); // Проверяем доступность URL
    return response.ok;
  } catch (error) {
    return false; // Если ошибка, то интернета нет
  }
};

// Основная функция для получения данных
export const getData = async () => {
  try {
    // Проверяем подключение к интернету
    const hasInternet = await checkInternetConnection(`${process.env.API_URL}/data.json`);
    if (!hasInternet) {
      console.error('Нет подключения к интернету');
      return null; // Возвращаем null, если интернета нет
    }

    // Конфигурируем заголовки запроса
    const headers = {
      'Content-Type': 'application/json', // Указываем, что отправляем JSON
      Accept: 'application/json', // Указываем, что ожидаем JSON в ответе
    };

    // Создание экземпляра Axios с общими настройками
    const axiosInstance = axios.create({
      baseURL: process.env.API_URL, // Используем базовый URL из переменной окружения
      timeout: 10000, // Устанавливаем тайм-аут запроса
      headers: headers, // Передаём наши заголовки
    });

    // Выполняем GET-запрос
    const response = await axiosInstance.get('/data.json');

    if (response.status === 200) {
      // Возвращаем данные напрямую
      return response.data;
    } else {
      console.error('Ошибка загрузки данных:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    return null;
  }
};