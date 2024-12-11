import axios from 'axios';
import * as Haptics from 'expo-haptics';

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

  Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Success
  )

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
    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: message,
      }
    );
  } catch (err) {
    console.warn(err);
  }
};