import { Text, View, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { useColors } from '../../common/Colors';

const EmptyCart = () => {
  const Colors = useColors()
  return (
    <View style={tw`w-full h-full items-center relative`}>
      <View style={tw`w-full flex items-center mt-18 justify-center`}>
        <Image source={require('../../assets/img/empty-cart.webp')} style={tw`w-40 h-40`} />
        <Text style={tw`text-lg text-[${Colors.darkModeText}]`}>Вероятно, вы еще ничего не заказали. Перейдите в меню для заказа.</Text>
      </View>
    </View>
  )
}

export default EmptyCart
