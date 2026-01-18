import axios from 'axios';
import { Vibration } from 'react-native';
import { BOT_TOKEN, CHAT_ID } from './config';

export const sendOrder = async (orderDetails) => {
  const {
    orderType,
    address,
    phoneNumber,
    comment,
    dishes,
    items,
    paid,
    totalPrice,
    totalWithDeliveryPrice,
    pay,
    checked,
    shortDate,
    shortTime,
    ordersCount
  } = orderDetails;

  Vibration.vibrate();

  const message =
    orderType === 'Доставка'
      ? `
Заказ # ${ordersCount}\n\n${orderType}\n\n${dishes}\n\nСумма: ${
          paid ? totalWithDeliveryPrice : totalPrice
        } ₽\nАдрес Доставки: ${address}\nНомер телефона: ${phoneNumber}\n\n${
          checked
            ? `Дата доставки: ${shortDate}\nВремя доставки: ${shortTime}`
            : `Дата доставки: Сегодня\nВремя доставки: Сейчас`
        }\nКомментарий: ${comment}\nСпособ оплаты: ${pay ? pay : 'Не выбран'}`
      : `Заказ # ${ordersCount}\n\n${orderType}\n\n${dishes}\n\nСумма: ${totalPrice} ₽\nНомер телефона: ${phoneNumber}\n${
          checked
            ? `Дата: ${shortDate}\nВремя: ${shortTime}`
            : `Дата: Сегодня\nВремя: Сейчас`
        }\nКомментарий: ${comment}`;

  try {
    if (!BOT_TOKEN || !CHAT_ID) {
      console.warn('Отправка заказа пропущена: отсутствуют BOT_TOKEN или CHAT_ID');
      return;
    }

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
  } catch (err) {
    console.warn(err);
  }
};
