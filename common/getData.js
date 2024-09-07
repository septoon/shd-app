import axios from "axios";

export const getData = async () => {
  try {
    const res = await axios.get('https://api.shashlichny-dom.ru/data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return res.data;
  } catch (err) {
    console.log('Error:', err.message); // Логгирование ошибки для детального разбора
    return null;
  }
};