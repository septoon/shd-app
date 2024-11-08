import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getData = async () => {
  try {
    // Получаем сохранённый ETag из AsyncStorage
    const savedETag = await AsyncStorage.getItem('menuDataETag');

    // Конфигурируем заголовки запроса
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (savedETag) {
      headers['If-None-Match'] = savedETag;
    }

    // Выполняем GET-запрос с настроенным validateStatus
    const response = await axios.get('https://api.shashlichny-dom.ru/data.json', {
      headers,
      validateStatus: (status) => {
        return status >= 200 && status < 300 || status === 304;
      },
    });

    if (response.status === 200) {
      // Данные изменились, сохраняем новые данные и ETag
      const newETag = response.headers.etag;
      const data = response.data;

      await AsyncStorage.setItem('menuData', JSON.stringify(data));
      await AsyncStorage.setItem('menuDataETag', newETag);

      return data;
    } else if (response.status === 304) {
      // Данные не изменились, загружаем из AsyncStorage
      const storedData = await AsyncStorage.getItem('menuData');
      return storedData ? JSON.parse(storedData) : null;
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    // В случае ошибки пытаемся загрузить данные из AsyncStorage
    const storedData = await AsyncStorage.getItem('menuData');
    return storedData ? JSON.parse(storedData) : null;
  }
};
