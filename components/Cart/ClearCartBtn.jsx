import { Alert, TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useCallback } from 'react'
import tw from 'twrnc'
import { clearCart } from '../../redux/Features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { useColors } from '../../common/Colors';

const ClearCartBtn = () => {
  const dispatch = useDispatch()
  const Colors = useColors()

  const handleClearCart = useCallback(() => {
    const confirmClearCart = () => dispatch(clearCart());

    Alert.alert('Очистить корзину', 'Вы уверены, что хотите очистить корзину?', [
      {
        text: 'Отмена',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Да', onPress: confirmClearCart },
    ]);
  }, [dispatch]);

  return (
    <TouchableOpacity onPress={handleClearCart} style={tw`flex flex-row self-end opacity-60`}>
      <MaterialIcons name="remove-shopping-cart" size={24} color={Colors.darkModeText} />
    </TouchableOpacity>
  )
}

export default ClearCartBtn