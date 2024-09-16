import { useSelector } from 'react-redux'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { clearCart } from '../redux/Features/cart/cartSlice'
import { useDispatch } from 'react-redux'

const ClearCartBtn = () => {
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.cart)

  const handleClearCart = () => {
    if(items.length > 0) {
      Alert.alert('Очистить корзину', 'Вы уверены, что хотите очистить корзину?', [
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Да', onPress: () => dispatch(clearCart())},
      ]);
    } else {
      Alert.alert('Корзина пуста', 'Ваша корзина пуста. Добавьте товары, чтобы очистить корзину.', [

        {text: 'Ок', onPress: () => dispatch(clearCart())},
      ]);
    }
    
  };

  return (
    <TouchableOpacity onPress={handleClearCart} style={tw`flex flex-row self-end`}>
      <Image source={require('../assets/img/clearCart.png')} style={tw`w-8 h-8`} />
    </TouchableOpacity>
  )
}

export default ClearCartBtn

const styles = StyleSheet.create({})