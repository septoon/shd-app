import axios from "axios";

export const getData = async () => {
  try {
    const res = await axios.get(`https://api.shashlichny-dom.ru/data.json?t=${Date.now()}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return res.data;
  } catch (err) {
    console.log('Error:', err.message);
    return null;
  }
};
