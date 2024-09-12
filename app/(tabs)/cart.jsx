import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addDishToCart, decrementDishFromCart, removeDishFromCart, clearCart } from '../../redux/Features/cart/cartSlice';
import CartItem from '../../components/CartItem';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';

const Cart = () => {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight()
  const dispatch = useDispatch();
  const { items, totalCount, totalPrice } = useSelector(state => state.cart);

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Корзина пуста', 'Вероятно, вы еще ничего не заказали. Переходите в меню для заказа.');
    } else {
      Alert.alert('Оформление заказа', 'Ваш заказ оформлен.');
      // Логика для оформления заказа (например, отправка данных на сервер)
    }
  };

  const handleClearCart = () => {
    Alert.alert('Очистить корзину', 'Вы уверены, что хотите очистить корзину?', [
      {
        text: 'Отмена',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Да', onPress: () => dispatch(clearCart())},
    ]);
  };

  return (
    <View style={[tw`w-full h-full border`, {paddingTop: headerHeight}]}>
      {items.length === 0 ? (
        <View >
          <Text>Вероятно, вы еще ничего не заказали. Переходите в меню для заказа.</Text>
          <Button title="Перейти в меню" onPress={() => navigation.navigate('index')} />
        </View>
      ) : (
        <View style={tw`pt-29`}>
          {items.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              onPlusDish={() => dispatch(addDishToCart(item))}
              onMinusDish={() => dispatch(decrementDishFromCart(item))}
              onRemoveDish={() => dispatch(removeDishFromCart(item))}
            />
          ))}
        </View>
      )}

      <Text>Всего товаров: {totalCount}</Text>
      <Text>Общая сумма: {totalPrice} ₽</Text>

      <Button title="Очистить корзину" onPress={handleClearCart} />
      <Button title="Оформить заказ" onPress={handleCheckout} />
      <Button title="Перейти в меню" onPress={() => navigation.navigate('index')} />
    </View>
  );
};

export default Cart;