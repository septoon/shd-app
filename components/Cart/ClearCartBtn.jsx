import { useSelector } from 'react-redux'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react'
import tw from 'twrnc'
import { clearCart } from '../../redux/Features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { useColors } from '../../common/Colors';

const ClearCartBtn = () => {
  const dispatch = useDispatch()
  const Colors = useColors()
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
    <TouchableOpacity onPress={handleClearCart} style={tw`flex flex-row self-end opacity-60`}>
      <MaterialIcons name="remove-shopping-cart" size={24} color={Colors.darkModeText} />
    </TouchableOpacity>
  )
}

export default ClearCartBtn

const styles = StyleSheet.create({})