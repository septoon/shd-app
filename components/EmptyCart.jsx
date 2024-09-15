import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const EmptyCart = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`w-full h-full items-center justify-start relative`}>
      <Image source={require('../assets/img/shopping-cart-realistic.png')} style={{ width: 200, height: 200 }} />
      <Text>Вероятно, вы еще ничего не заказали. Переходите в меню для заказа.</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('index')}>
        <Text style={styles.buttonText}>Вернуться в меню</Text>
      </Pressable>
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
    backgroundColor: '#FB5a3c',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: 'white',
  },
})