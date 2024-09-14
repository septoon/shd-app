import React from 'react';
import { View, Text, Button, Alert, SafeAreaView, Image, StyleSheet, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addDishToCart, decrementDishFromCart, removeDishFromCart, clearCart } from '../../redux/Features/cart/cartSlice';
import CartItem from '../../components/CartItem';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import tw from 'twrnc';

const Cart = () => {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight()
  const dispatch = useDispatch();
  const { items, totalCount, totalPrice } = useSelector(state => state.cart);
  console.log(items)
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
    <SafeAreaView style={tw`w-full h-full`}>
      {items.length === 0 ? (
        <View style={tw`w-full h-full items-center justify-start relative`}>
          <Image source={require('../../assets/img/shopping-cart-realistic.png')} style={{ width: 200, height: 200 }} />
          <Text>Вероятно, вы еще ничего не заказали. Переходите в меню для заказа.</Text>
          <Pressable style={styles.button} onPress={() => navigation.navigate('index')}>
            <Text style={styles.buttonText}>Вернуться в меню</Text>
          </Pressable>
        </View>
      ) : (
        <View style={tw`w-full h-full flex items-center justify-start relative px-2`}>
          <Button title="Очистить корзину" style={styles.clearCart} onPress={handleClearCart} />
          {items.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              onPlusDish={() => dispatch(addDishToCart(item))}
              onMinusDish={() => dispatch(decrementDishFromCart(item))}
              onRemoveDish={() => dispatch(removeDishFromCart(item))}
            />
          ))}
          <Text>Всего товаров: {totalCount}</Text>
          <Text>Общая сумма: {totalPrice} ₽</Text>
          <Button title="Оформить заказ" onPress={handleCheckout} />
          <Pressable style={styles.button} onPress={() => navigation.navigate('index')}>
            <Text style={styles.buttonText}>Вернуться в меню</Text>
          </Pressable>
        </View>
      )}


    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  clearCart: {
    justifySelf: 'flex-end'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    left: 10,
    right: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#FB5a3c',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: 'white',
  },
});