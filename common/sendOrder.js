import axios from 'axios';

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
    ordersCount,
    setOrderValues,
    onClickClearCart,
  } = orderDetails;

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

  setOrderValues({
    orderType,
    address,
    phoneNumber,
    comment,
    dishes,
    paid,
    totalPrice,
    totalWithDeliveryPrice,
    items,
    pay,
    checked,
    shortDate,
    shortTime,
    ordersCount,
  });

  try {
    await axios.post(
      'https://api.telegram.org/bot6449386041:AAGzqG0r-R9AJFcY0EeV0vv6XBjFNDx_7xE/sendMessage',
      {
        chat_id: '-1001929441485',
        text: message,
      }
    );
    onClickClearCart();
  } catch (err) {
    console.warn(err);
  }
};