import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import tw from 'twrnc';

import {
  clearDishCart,
  removeDish,
  decrementDish,
  incrementDish,
} from '../../redux/Features/cart/cartSlice';

import Trash from '../../common/img/trash.svg';
import CartIcon from '../../common/img/cart-logo.svg';

import axios from 'axios';
import { ScrollView } from 'moti';
import { View, Text, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { store } from '../../redux/store';
import { Link } from 'expo-router';
import CartItem from '../../components/CartItem';
import { selectCartItems, selectTotalCount, selectTotalPrice } from '../../common/selectors';
// import OrderFinish from '../components/OrderFinish';
// import Order from '../components/Order';
// import CartItem from '../components/CartItem';

const Cart = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);  // Используем мемоизированные селекторы
  const totalCount = useSelector(selectTotalCount);
  const totalPrice = useSelector(selectTotalPrice);

  // Создаем новый массив уникальных элементов, используя метод reduce().
  const uniqueProducts = items.reduce((acc, current) => {
    // Проверяем, есть ли элемент с таким же id в массиве acc
    const isDuplicate = acc.find((item) => item.id === current.id);
    // Если элемент не найден, добавляем его в массив acc.
    if (!isDuplicate) {
      acc.push(current);
    }
    // Возвращаем массив acc на каждой итерации
    return acc;
  }, []);

  const countById = (items, id) => {
    return items.reduce((count, i) => {
      if (i.id === id) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const [isOrderFinish, setIsOrderFinish] = useState(false);

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  const footerContent = (
    <View style="flex justify-between items-center">
      <Text style="text-sm text-left w-1/2">
        В течение 10-ти минут с вами свяжется оператор, для подтверждения заказа.
      </Text>
      <Button
        label="Ok"
        style="py-2 px-4 h-10"
        icon="pi pi-check"
        onClick={() => setIsOrderFinish(false)}
        autoFocus
      />
    </View>
  );

  const onClickRemoveDish = (dishObj) => {
    dispatch(removeDish(dishObj));
  };
  const onClickClearCart = () => {
    dispatch(clearDishCart());
  };

  const onClickMinusDish = (dishObj) => {
    dispatch(decrementDish(dishObj));
  };

  const onClickPlusDish = (dishObj) => {
    dispatch(incrementDish(dishObj));
    console.log(items);
  };

  const [datetime24h, setDateTime24h] = useState(new Date());
  const shortDate = datetime24h.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const shortTime = datetime24h.toLocaleTimeString('ru-RU', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
  });

  const [checked, setChecked] = useState(false);

  const [orderType, setOrderType] = useState('Доставка');
  const ordersCount = Math.floor(Math.random() * 99999999);

  const [orderValues, setOrderValues] = useState({});

  // const sendOrder = async (
  //   orderType,
  //   address,
  //   phoneNumber,
  //   comment,
  //   dishes,
  //   items,
  //   countById,
  //   totalItems,
  //   pay,
  // ) => {
  //   let message =
  //     orderType === 'Доставка'
  //       ? `
  //   Заказ # ${ordersCount}
  //   ${orderType}
  //   ${dishes.toString()}
  //   Сумма: ${totalPrice < 1000 ? totalPrice + 200 : totalPrice}
  //   Адрес Доставки: ${address}
  //   Номер телефона: ${phoneNumber}
  //           ${
  //             checked
  //               ? `
  //   Дата доставки: ${shortDate}
  //   Время доставки: ${shortTime}`
  //               : `
  //   Дата доставки: Сегодня
  //   Время доставки: Сейчас`
  //           }
  //   Комментарий: ${comment}
  //   Способ оплаты: ${pay}
  //         `
  //       : `Заказ # ${ordersCount}
  //   ${orderType}
  //   ${dishes.toString()}
  //   Сумма: ${totalPrice}
  //   Номер телефона: ${phoneNumber}
  //           ${
  //             checked
  //               ? `
  //   Дата доставки: ${shortDate}
  //   Время доставки: ${shortTime}`
  //               : `
  //   Дата доставки: Сегодня
  //   Время доставки: Сейчас`
  //           }
  //         `;
  //   setOrderValues({
  //     orderType,
  //     address,
  //     phoneNumber,
  //     comment,
  //     dishes,
  //     totalPrice,
  //     items,
  //     countById,
  //     totalItems,
  //     pay,
  //   });
  //   await axios
  //     .post(
  //       'https://api.telegram.org/bot6449386041:AAGzqG0r-R9AJFcY0EeV0vv6XBjFNDx_7xE/sendMessage',
  //       {
  //         chat_id: '-1001929441485',
  //         text: message,
  //       },
  //     )
  //     .then((res) => {
  //       onClickClearCart();
  //     })
  //     .catch((err) => {
  //       console.warn(err);
  //     });
  // };
  return (
    <ScrollView style={tw`pt-16 w-full`}>
    {/* <Dialog
    header="Ваш заказ"
    visible={visible}
    position={position}
    style="w-screen lg:w-[40vw]"
    onHide={() => setVisible(false)}
    draggable={false}
    resizable={false}>
    <Order
      checked={checked}
      setChecked={setChecked}
      setIsOrderFinish={setIsOrderFinish}
      datetime24h={datetime24h}
      setDateTime24h={setDateTime24h}
      setVisible={setVisible}
      onClickClearCart={onClickClearCart}
      countById={countById}
      totalItems={items}
      items={uniqueProducts}
      totalCount={totalCount}
      totalPrice={totalPrice}
      sendOrder={sendOrder}
      orderType={orderType}
      setOrderType={setOrderType}
    />
  </Dialog>
  <Dialog
    header="Спасибо за заказ"
    visible={isOrderFinish}
    position={position}
    style="w-screen lg:w-[40vw]"
    footer={footerContent}
    onHide={() => setIsOrderFinish(false)}
    draggable={false}
    resizable={false}>
    <OrderFinish orderValues={orderValues} shortDate={shortDate} shortTime={shortTime} />
  </Dialog> */}
    <View style={tw`px-1`}>
      {items.length ? (
        // Если в корзине что-то есть
        <>
          <View style={tw`w-full flex justify-end text-lightSlate-gray pt-10 pr-6`}>
            <TouchableOpacity
              style={tw`flex mt-2 mb-4`}
              onPress={() => {
                Alert.alert('Очистить корзину', 'Вы уверены, что хотите очистить корзину?', [
                  {
                    text: 'Отменить',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'Да', onPress: () => dispatch(clearDishCart())},
                ])
              }}>
              <Image style={tw`text-lightSlate-gray`} src={Trash} />
              <Text>Очистить корзину</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`px-2 h-auto pt-2 mb-6`}>
            {uniqueProducts.map((item, index) => {
              const count = countById(items, item.id,);

              return (
                <CartItem
                  key={index}
                  countById={count}
                  onClickMinusDish={() => onClickMinusDish({ dishId: item.id })}
                  onClickPlusDish={() => onClickPlusDish({ dishId: item.id })}
                  onClickRemoveDish={() => onClickRemoveDish({ dishId: item.id })}
                  {...item}
                />
              );
            })}
          </View>
          <View style="">
            <View style={tw`mb-3 w-full flex flex-col justify-between px-3 transition-all`}>
              <Text style={tw`font-bold text-lg text-lightSlate-gray`}>
                {' '}
                Всего блюд: {totalCount} шт.{' '}
              </Text>
              <Text style={tw`text-lightSlate-gray text-lg`}> Сумма заказа: {totalPrice} ₽ </Text>
            </View>
            <View style={tw`w-full pl-3`}>
              <Button
                style={tw`px-4 py-2 bg-gray text-white rounded-md`}
                onClick={() => show('bottom')}
                title="Оформить заказ"
              />
            </View>
          </View>
        </>
      ) : (
        // Если корзина пустая
        <View style={tw`px-6 pt-6 w-full flex flex-col items-center justify-around`}>
          <Text style={tw`mb-6 self-start`}>Корзина пустая</Text>
          <Image src={CartIcon} style={tw`opacity-50 w-1/2 max-w-[300px]`} />
          <Text style={tw`mt-6`}>
            Вероятней всего, вы еще ничего не заказали. Для того, чтобы сделать заказ, перейди
            на страницу меню.
          </Text>
          <Link href="./index">
            Вернуться назад
          </Link>
        </View>
      )}
    </View>
  </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
