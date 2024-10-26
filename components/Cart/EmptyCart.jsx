import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { useColors } from '../../common/Colors';

const EmptyCart = () => {
  const navigation = useNavigation();
  const Colors = useColors()
  return (
    <View style={tw`w-full h-full pt-10 items-center justify-start relative`}>
      <Image source={require('../../assets/img/empty-cart.png')} style={{ width: 200, height: 200 }} />
      <Text style={tw`text-lg text-[${Colors.darkModeText}]`}>Вероятно, вы еще ничего не заказали. Переходите в меню для заказа.</Text>
      <TouchableOpacity style={[styles.button, tw`bg-[${Colors.main}]`]} onPress={() => navigation.navigate('index')}>
        <Text style={[styles.buttonText, tw`bg-[${Colors.main}]`]}>Вернуться в меню</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EmptyCart

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 6,
    right: 6,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: 'white',
  },
})